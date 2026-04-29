import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { HEADERS } from "@/src/shared/constant/api.constant";

export async function POST(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        headers: {
            ...HEADERS.authorize(token.token),
        },
        body: formData,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
}