#!/usr/bin/env python3
"""
Maxvario Content Sync
---------------------
Reads published rows from a Google Sheet and upserts them to WordPress
via the WP REST API.

Tabs synced:
  • "Study Materials"  →  WP custom post type: resource
  • "Gear"             →  WP custom post type: gear

Usage:
  python scripts/sync_content.py          # sync both
  python scripts/sync_content.py resources
  python scripts/sync_content.py gear

Prerequisites:
  pip install google-auth google-auth-httplib2 google-api-python-client requests
  Copy .env.sync.example → .env.sync and fill in your values.
  See README note at the bottom of this file for WordPress setup.
"""

import os
import re
import sys
import base64
import json
from pathlib import Path

import requests
from dotenv import load_dotenv
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# ── Load env ──────────────────────────────────────────────────────────────────
load_dotenv(Path(__file__).parent / ".env.sync")

SHEET_ID         = os.environ["SHEET_ID"]
WP_API_BASE      = os.environ["WP_API_BASE"].rstrip("/")   # e.g. https://api.maxvario.com/wp-json/wp/v2
WP_USER          = os.environ["WP_USER"]
WP_APP_PASSWORD  = os.environ["WP_APP_PASSWORD"]
GOOGLE_CREDS     = os.environ["GOOGLE_CREDS_JSON"]          # path to service account JSON file

# ── Google Sheets ─────────────────────────────────────────────────────────────

def get_sheet_rows(tab_name: str) -> list[dict]:
    """Return all rows from a sheet tab as a list of dicts keyed by header."""
    creds = Credentials.from_service_account_file(
        GOOGLE_CREDS,
        scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"],
    )
    service = build("sheets", "v4", credentials=creds, cache_discovery=False)
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SHEET_ID, range=f"'{tab_name}'!A1:Z")
        .execute()
    )
    rows = result.get("values", [])
    if len(rows) < 2:
        return []
    headers = rows[0]
    return [
        {headers[i]: (row[i] if i < len(row) else "") for i in range(len(headers))}
        for row in rows[1:]
    ]


# ── WordPress helpers ─────────────────────────────────────────────────────────

def _auth() -> str:
    token = base64.b64encode(f"{WP_USER}:{WP_APP_PASSWORD}".encode()).decode()
    return f"Basic {token}"


def wp_get_existing(post_type: str) -> dict[str, int]:
    """Return {slug: post_id} for every post of a given CPT."""
    existing: dict[str, int] = {}
    page = 1
    while True:
        r = requests.get(
            f"{WP_API_BASE}/{post_type}",
            params={"per_page": 100, "page": page, "status": "any"},
            headers={"Authorization": _auth()},
            timeout=15,
        )
        if not r.ok:
            break
        batch = r.json()
        if not batch:
            break
        for post in batch:
            existing[post["slug"]] = post["id"]
        if len(batch) < 100:
            break
        page += 1
    return existing


def wp_upload_image(image_url: str, filename: str) -> int | None:
    """Download an image from a URL and upload it to the WP media library."""
    try:
        img = requests.get(image_url, timeout=20)
        img.raise_for_status()
        content_type = img.headers.get("Content-Type", "image/jpeg").split(";")[0]
        r = requests.post(
            f"{WP_API_BASE}/media",
            headers={
                "Authorization": _auth(),
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Content-Type": content_type,
            },
            data=img.content,
            timeout=30,
        )
        if r.ok:
            return r.json()["id"]
        print(f"    ⚠ media upload failed ({r.status_code}): {r.text[:120]}")
    except Exception as exc:
        print(f"    ⚠ image fetch/upload error: {exc}")
    return None


def _slugify(text: str) -> str:
    slug = text.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    return slug.strip("-")


def _image_filename(slug: str, url: str) -> str:
    ext = url.split("?")[0].rsplit(".", 1)[-1]
    ext = ext if ext in {"jpg", "jpeg", "png", "webp", "gif", "svg"} else "jpg"
    return f"{slug}.{ext}"


def wp_upsert(post_type: str, slug: str, payload: dict, existing: dict[str, int]):
    headers = {"Authorization": _auth(), "Content-Type": "application/json"}
    if slug in existing:
        post_id = existing[slug]
        r = requests.post(f"{WP_API_BASE}/{post_type}/{post_id}", json=payload, headers=headers, timeout=15)
        verb = "updated"
    else:
        r = requests.post(f"{WP_API_BASE}/{post_type}", json={**payload, "slug": slug}, headers=headers, timeout=15)
        verb = "created"

    if r.ok:
        print(f"  ✓ {verb}: {slug}")
        existing[slug] = r.json().get("id", existing.get(slug))
    else:
        print(f"  ✗ failed ({r.status_code}): {slug}")
        print(f"    {r.text[:200]}")


# ── Sync: Study Materials ─────────────────────────────────────────────────────
#
# WordPress setup required before running this section:
#   1. Register a CPT with slug "resource" (add to your theme's functions.php
#      or a plugin). Enable REST API: show_in_rest = true.
#   2. Register the following meta fields (also show_in_rest = true):
#      resource_author, resource_category, resource_url, resource_description,
#      resource_platform, resource_free (boolean), resource_logo_gradient (bool),
#      resource_logo_light (boolean)
#   3. The Next.js frontend will need a getResources() call added to wp.ts.

def sync_resources():
    print("\n── Study Materials ──────────────────────────────────────")
    rows = get_sheet_rows("Study Materials")
    published = [r for r in rows if r.get("status", "").strip().lower() == "published"]
    print(f"  {len(published)} published  /  {len(rows)} total rows")

    if not published:
        print("  Nothing to sync.")
        return

    existing = wp_get_existing("resource")
    print(f"  {len(existing)} existing WP posts found")

    for row in published:
        title = row.get("title", "").strip()
        if not title:
            continue
        slug = _slugify(title)

        featured_media = None
        image_url = row.get("image_url", "").strip()
        if image_url.startswith("http"):
            print(f"  → uploading image for: {slug}")
            featured_media = wp_upload_image(image_url, _image_filename(slug, image_url))

        payload: dict = {
            "title":  title,
            "status": "publish",
            "meta": {
                "resource_author":        row.get("author", "").strip(),
                "resource_category":      row.get("category", "").strip().lower(),
                "resource_url":           row.get("url", "").strip(),
                "resource_description":   row.get("description", "").strip(),
                "resource_platform":      row.get("platform", "").strip(),
                "resource_free":          row.get("free", "FALSE").strip().upper() == "TRUE",
                "resource_logo_gradient": row.get("logo_on_gradient", "FALSE").strip().upper() == "TRUE",
                "resource_logo_light":    row.get("logo_on_light", "FALSE").strip().upper() == "TRUE",
            },
        }
        if featured_media:
            payload["featured_media"] = featured_media

        wp_upsert("resource", slug, payload, existing)


# ── Sync: Gear ────────────────────────────────────────────────────────────────
#
# WordPress setup required:
#   The "gear" CPT should already exist (the site uses it). You just need to
#   confirm the WP REST API base slug — check by visiting:
#     https://api.maxvario.com/wp-json/wp/v2/types
#   and finding the gear post type's rest_base value. If it's not "gear",
#   update WP_GEAR_POST_TYPE in .env.sync.

WP_GEAR_POST_TYPE = os.environ.get("WP_GEAR_POST_TYPE", "gear")


def sync_gear():
    print("\n── Gear ─────────────────────────────────────────────────")
    rows = get_sheet_rows("Gear")
    published = [r for r in rows if r.get("status", "").strip().lower() == "published"]
    print(f"  {len(published)} published  /  {len(rows)} total rows")

    if not published:
        print("  Nothing to sync.")
        return

    existing = wp_get_existing(WP_GEAR_POST_TYPE)
    print(f"  {len(existing)} existing WP posts found")

    for row in published:
        title = row.get("title", "").strip()
        if not title:
            continue
        slug = _slugify(title)

        featured_media = None
        thumb_url = row.get("thumbnail_url", "").strip()
        if thumb_url.startswith("http"):
            print(f"  → uploading thumbnail for: {slug}")
            featured_media = wp_upload_image(thumb_url, _image_filename(slug, thumb_url))

        payload: dict = {
            "title":  title,
            "status": "publish",
            "meta": {
                "gear_brand":             row.get("brand", "").strip(),
                "gear_category":          row.get("category", "").strip(),
                "gear_price":             row.get("price", "").strip(),
                "gear_buy_url":           row.get("buy_url", "").strip(),
                "gear_short_description": row.get("short_description", "").strip(),
                "gear_weight":            row.get("weight", "").strip(),
            },
        }
        if featured_media:
            payload["featured_media"] = featured_media

        wp_upsert(WP_GEAR_POST_TYPE, slug, payload, existing)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    mode = sys.argv[1].lower() if len(sys.argv) > 1 else "all"
    valid = {"all", "resources", "gear"}
    if mode not in valid:
        print(f"Usage: python sync_content.py [{'|'.join(sorted(valid))}]")
        sys.exit(1)

    if mode in ("all", "resources"):
        sync_resources()
    if mode in ("all", "gear"):
        sync_gear()

    print("\nSync complete.")


if __name__ == "__main__":
    main()
