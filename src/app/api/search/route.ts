import recaptchaIsValid from "@/lib/recaptcha";
import { wpRequest } from "@/lib/api/wp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const captchaVerification = await recaptchaIsValid(body.recaptchaToken);
  if (!captchaVerification) {
    return NextResponse.json(
      { success: false, messages: ["Robot check failed! Please refresh the page and try again"] },
      { status: 400 }
    );
  }

  const res = await wpRequest(
    `${process.env.NEXT_PUBLIC_MAXVARIO_API}/search?search=${body?.search}&locale=${body?.locale}&lang=${body?.locale}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  if (!res) return NextResponse.json({ success: false }, { status: 500 });
  const result = JSON.parse(res.body);
  return NextResponse.json(result, { status: res.status });
}
