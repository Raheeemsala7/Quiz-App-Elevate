import { getMultiQuestionApi, postMultiBulkQuestionAction, } from "@/src/features/questions/apis/question.api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {

    const body = await req.json()

    const { id } = await context.params


    const payload = await postMultiBulkQuestionAction({ req, body, id });

    return NextResponse.json(payload, {
        status: payload.status ? 200 : 400
    });

}


export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    
    const { id } = await context.params

    const payload = await getMultiQuestionApi({ req, id });

    return NextResponse.json(payload);
}