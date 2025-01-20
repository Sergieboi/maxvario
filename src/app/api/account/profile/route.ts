import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";


export async function POST(request: NextRequest) {
    const session = await auth();
    const data = await request.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/me`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify(data)
    });
    await res.json();
    if (res.ok) {
        const result = await res.json();
        if (Array.isArray(result.messages) && result.messages.length) {
            return NextResponse.json({ success: false, messages: result.messages }, { status: res.status });
        }
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: res.status });
}