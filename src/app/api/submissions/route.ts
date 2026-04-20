import { postSubmissions } from "@/src/features/questions/apis/question.api";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();

    const payload = await postSubmissions({ req, body })

    return payload
}