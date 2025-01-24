import { NextRequest, NextResponse } from "next/server";
import recaptchaIsValid from "@/lib/recaptcha";

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
    // Send the email to the newsletter service
    const response = await fetch(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/mailchimp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: body.email,
        }),
    });
    
    if (response.ok) {
        const result = await response.json();
        if (result.success) {
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: false, messages: [] }, { status: 500 });
}
