import http from "http";
import { DEFAULT_LOCALE } from "../constants";
import {
  ApiResponse,
  CalendarResponse,
  Locale,
  MVGear,
  SidebarContent,
  SiteTaxonomies,
  TaxonomyPage,
} from "../types/misc";

type Fetcher = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, unknown>;
  locale?: Locale;
  revalidate?: number;
  token?: string;
};

type WpRequestResult = {
  status: number;
  contentType: string;
  location: string | null;
  body: string;
};

// Node.js http.request honours a custom Host header; global fetch() silently
// overrides it with the URL hostname. We route all server-side WordPress calls
// through wp-internal.maxvario.com (bypasses Cloudflare) while presenting
// Host: api.maxvario.com so Apache serves the correct vhost.
function httpRaw(
  targetUrl: string,
  method: string,
  headers: Record<string, string>,
  body?: string
): Promise<WpRequestResult> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: Number(parsed.port) || 80,
        path: parsed.pathname + (parsed.search || ""),
        method,
        headers: body
          ? { ...headers, "Content-Length": Buffer.byteLength(body).toString() }
          : headers,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode ?? 0,
            contentType: (res.headers["content-type"] as string) ?? "",
            location: (res.headers["location"] as string) ?? null,
            body: Buffer.concat(chunks).toString("utf8"),
          })
        );
      }
    );
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

// Shared bypass request used by both the fetcher and Next.js API routes.
// Follows redirects while keeping the Host header intact on every hop.
export async function wpRequest(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  } = {}
): Promise<WpRequestResult | null> {
  const internalHost = process.env.MAXVARIO_INTERNAL_HOST;
  const method = options.method ?? "GET";

  if (!internalHost) {
    // No bypass configured — call WordPress directly via fetch.
    try {
      const res = await fetch(url, {
        method,
        headers: options.headers,
        body: options.body,
      });
      return {
        status: res.status,
        contentType: res.headers.get("content-type") ?? "",
        location: res.headers.get("location"),
        body: await res.text(),
      };
    } catch (err) {
      console.error("[wpRequest] fetch error:", url, err);
      return null;
    }
  }

  const headers: Record<string, string> = {
    ...options.headers,
    Host: "api.maxvario.com",
  };

  try {
    let currentUrl = url.replace("https://api.maxvario.com", `http://${internalHost}`);

    for (let i = 0; i < 5; i++) {
      const res = await httpRaw(currentUrl, method, headers, options.body);
      if (res.status >= 300 && res.status < 400 && res.location) {
        const resolved = res.location.startsWith("http")
          ? res.location
          : new URL(res.location, currentUrl).toString();
        currentUrl = resolved.replace("https://api.maxvario.com", `http://${internalHost}`);
        // Redirects are always GET
        continue;
      }
      return res;
    }
  } catch (err) {
    console.error("[wpRequest] error:", url, err);
  }
  return null;
}

export const fetcher = async ({
  url,
  method,
  data,
  locale,
  revalidate,
  token,
}: Fetcher) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept-Language": locale || DEFAULT_LOCALE,
    Authorization: token ? `Bearer ${token}` : "",
    "User-Agent": "Mozilla/5.0 (compatible; Maxvario/1.0)",
  };

  const internalHost = process.env.MAXVARIO_INTERNAL_HOST;

  // For GET requests use the bypass; for mutations without bypass use plain fetch.
  if (!internalHost || (method && method !== "GET")) {
    try {
      const response = await fetch(url, {
        method: method || "GET",
        headers,
        body: data ? JSON.stringify(data) : undefined,
        next: { revalidate: revalidate ?? 300 },
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) return null;
      const result = await response.json();
      return response.ok ? result : null;
    } catch (error) {
      console.error("[fetcher] error:", url, error);
      return null;
    }
  }

  try {
    const res = await wpRequest(url, { method: "GET", headers });
    if (!res) return null;
    if (!res.contentType.includes("application/json")) {
      console.error("[fetcher] non-JSON:", res.status, res.contentType, "for:", url);
      return null;
    }
    const result = JSON.parse(res.body);
    return res.status >= 200 && res.status < 300 ? result : null;
  } catch (error) {
    console.error("[fetcher] error:", url, error);
  }
  return null;
};

export const getHome = async (locale: Locale) => {
  try {
    const data = await fetcher({
      url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/home?lang=${locale}`,
      revalidate: 120,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCalendar = async (
  data: Record<string, unknown> | undefined,
  locale: Locale
): Promise<ApiResponse<CalendarResponse> | null> => {
  const response = await fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/calendar?lang=${locale}`,
    data,
    locale,
  });
  return response;
};

export const getCategories = async (
  locale: Locale
): Promise<ApiResponse<SiteTaxonomies>> => {
  const categories = await fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/categories?lang=${locale}`,
    revalidate: 300,
  });
  return categories;
};

export const getNews = async (locale: Locale) => {
  const news = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/news?lang=${locale}&order=desc&order_by=date&per_page=100`,
    locale,
    revalidate: 300,
  });
  return news;
};
export const getPosts = async (locale: Locale) => {
  const posts = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?lang=${locale}&order=desc&order_by=date&per_page=100`,
    locale,
    revalidate: 300,
  });
  return posts;
};

export const getSidebarContent = async (
  postType = "",
  locale: Locale
): Promise<null | ApiResponse<SidebarContent>> => {
  console.log(
    `${process.env.NEXT_PUBLIC_MAXVARIO_API}/sidebar?lang=${locale}&post_type=${postType}`
  );
  const content = await fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/sidebar?lang=${locale}&post_type=${postType}`,
    locale,
    revalidate: 120,
  });
  return content;
};

export const getStaticPage = async (slug: string, locale: Locale) => {
  const page = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/pages?slug=${slug}&lang=${locale}`,
    locale,
    revalidate: 120,
  });
  if (Array.isArray(page) && page.length > 0) {
    return page[0];
  }
  return null;
};

export const getRace = async (slug: string, locale: Locale) => {
  const race = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/races?slug=${slug}&lang=${locale}`,
    locale,
    revalidate: 120,
  });
  if (Array.isArray(race) && race.length > 0) {
    return race[0];
  }
  return null;
};

export const getNewsBlog = async (slug: string, locale: Locale) => {
  const blog = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/news?slug=${slug}&lang=${locale}`,
    locale,
    revalidate: 600,
  });
  if (Array.isArray(blog) && blog.length > 0) {
    return blog[0];
  }
  return null;
};

export const getPostBlog = async (slug: string, locale: Locale) => {
  const blog = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?slug=${slug}&lang=${locale}`,
    locale,
    revalidate: 600,
  });
  if (Array.isArray(blog) && blog.length > 0) {
    return blog[0];
  }
  return null;
};

export const getGear = async (
  locale: Locale,
  category?: string
): Promise<ApiResponse<MVGear[]> | null> => {
  const params = new URLSearchParams({ lang: locale });
  if (category) params.set("category", category);
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/gear?${params}`,
    locale,
  });
};

export const getSingleGear = async (
  slug: string,
  locale: Locale
): Promise<ApiResponse<MVGear> | null> => {
  return fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/gear/${slug}?lang=${locale}`,
    locale,
  });
};

export const getTaxonomy = async (
  tax: string,
  term: string,
  locale: Locale
): Promise<null | ApiResponse<TaxonomyPage>> => {
  const taxonomy = await fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/taxonomy?taxonomy=${tax}&term=${term}&lang=${locale}`,
    locale,
    revalidate: 600,
  });
  if (taxonomy) {
    return taxonomy;
  }
  return null;
};
