import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  try {
    const data = await request.formData();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MAXVARIO_API}/create-blog`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: data,
      }
    );
    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const result = await response.json();
      return NextResponse.json(
        { success: false, messages: result.messages },
        { status: response.status }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, messages: ["An error occurred"] },
      { status: 500 }
    );
  }
}
