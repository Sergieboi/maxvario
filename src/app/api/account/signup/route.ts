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

  const register = await fetch(
    `${process.env.NEXT_PUBLIC_MAXVARIO_API}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const result = await register.json();
  return NextResponse.json(result);
}
