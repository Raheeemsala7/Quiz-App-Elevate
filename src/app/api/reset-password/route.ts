import { resetPassword } from "@/src/features/account/apis/account.api";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const res = await resetPassword({ req, body })
        return NextResponse.json(res)

    } catch (err: any) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        )
    }
}