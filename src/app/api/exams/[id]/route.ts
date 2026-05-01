import { deleteExamApi, putUpdateExam } from "@/src/features/exams/apis/exams.api";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {

    const body = await req.json()

    const { id } = await context.params


    const payload = await putUpdateExam({ req, body, id });     

    return NextResponse.json(payload);

}
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {


    const { id } = await context.params


    const payload = await deleteExamApi({ req, id });

    return NextResponse.json(payload);

}