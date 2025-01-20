import recaptchaIsValid from "@/lib/recaptcha";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const captchaVerification = await recaptchaIsValid(body.recaptchaToken);
  if (!captchaVerification) {
    return NextResponse.json(
      {
        success: false,
        messages: ["Robot check failed! Please refresh the page and try again"],
      },
      {
        status: 400,
      }
    );
  }
  const req = await fetch(
    // passing lang for wpml, autmatically checks the lang parameter
    `${process.env.NEXT_PUBLIC_MAXVARIO_API}/search?search=${body?.search}&locale=${body?.locale}&lang=${body?.locale}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await req.json();
  return NextResponse.json(result);
}
