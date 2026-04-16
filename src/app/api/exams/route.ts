import { getExams } from "@/src/features/exams/apis/exams.api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const payload = await getExams(req)

    return NextResponse.json(payload)
}