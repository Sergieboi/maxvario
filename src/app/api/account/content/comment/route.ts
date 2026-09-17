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

  const res = await wpRequest(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/create-comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res) return NextResponse.json({ success: false }, { status: 500 });
  const result = JSON.parse(res.body);
  return NextResponse.json(result, { status: res.status });
}
