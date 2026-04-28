import { getExamsApi } from "@/src/features/exams/apis/exams.api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const payload = await getExamsApi(req)

    return NextResponse.json(payload)
}