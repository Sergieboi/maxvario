import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const formDataToSend = new URLSearchParams();
    if (body?.country) {
      (body.country ?? '')?.split(",").forEach((country: string) => {
        formDataToSend.append("country[]", country);
      })
    }
    if (body?.athleteCategory) {
      (body.athleteCategory ?? '').split(",").forEach((category: string) => {
        formDataToSend.append("athlete_category[]", category);
      })
    }
    if (body?.faiCategory) {
      (body.faiCategory ?? '').split(",").forEach((category: string) => {
        formDataToSend.append("fai_category[]", category);
      })
    }
    if (body?.raceCategory) {
      (body.raceCategory ?? '').split(",").forEach((category: string) => {
        formDataToSend.append('race_category[]', category);
      })
    }
    if (body?.raceFormat) {
      (body.raceFormat ?? '').split(",").forEach((category: string) => {
        formDataToSend.append('race_format[]', category);
      })
    }

    if (body?.city) formDataToSend.append("city", body.city);
    if (body?.title) formDataToSend.append("title", body.title);
    if (body?.dateFrom) formDataToSend.append("after", body.dateFrom);
    if (body?.dateTo) formDataToSend.append("before", body.dateTo);


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
  } catch (e){
    console.error(e);
    return NextResponse.json({ message: "error", status: 500 });
  }
}
