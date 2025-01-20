import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function POST(request: NextRequest) {
    const body  = await request.json();
    const session = await auth();
    const req = await fetch(
        `${process.env.NEXT_PUBLIC_MAXVARIO_API}/subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user.token}`
          },
          body: JSON.stringify(body),
        }
      );
      const result = await req.json();
      return NextResponse.json(result);
}