import { wpRequest } from "@/lib/api/wp";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await auth();

  const res = await wpRequest(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res) return NextResponse.json({ success: false }, { status: 500 });
  const result = JSON.parse(res.body);
  return NextResponse.json(result, { status: res.status });
}
