import { postSubmissions } from "@/src/features/questions/apis/question.api";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {
        const body = await req.json();

        const payload = await postSubmissions({ req, body });

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