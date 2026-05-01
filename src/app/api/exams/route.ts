import { getExamsApi, postCreateExam } from "@/src/features/exams/apis/exams.api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const payload = await getExamsApi(req)

    return NextResponse.json(payload)
}


export async function POST(req: NextRequest) {

    const body = await req.json()

    const payload = await postCreateExam({ req, body });

    return NextResponse.json(payload);

}