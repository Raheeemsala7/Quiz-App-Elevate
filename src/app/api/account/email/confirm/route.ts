import { changeEmailRequest } from "@/src/features/account/apis/account.api";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const payload = await changeEmailRequest({ req, body });

        return NextResponse.json(payload);
    } catch (error: any) {
        return NextResponse.json(
            {
                status: false,
                message: error.message || "Internal Error",
                errors: error.errors || [],
            },
            { status: error.code || 500 }
        );
    }
}