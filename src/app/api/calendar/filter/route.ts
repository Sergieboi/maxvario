import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const formDataToSend = new URLSearchParams();
    if (body.country) formDataToSend.append("country", body.country);
    if (body.city) formDataToSend.append("city", body.city);
    if (body.title) formDataToSend.append("title", body.title);
    if (body.dateFrom) formDataToSend.append("after", body.dateFrom);
    if (body.dateTo) formDataToSend.append("before", body.dateTo);

    console.log(formDataToSend.toString());

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_MAXVARIO_API
      }/calendar?${formDataToSend.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json({ ...result }, { status: 200 });
    } else {
      return NextResponse.json({ message: "error", status: 500 });
    }
  } catch {
    return NextResponse.json({ message: "error", status: 500 });
  }
}
