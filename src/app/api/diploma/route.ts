import { getDiplomasApi, postCreateDiploma, putUpdateDiploma } from "@/src/features/diploma/apis/diploma.api";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    const payload = await getDiplomasApi(req);

    return NextResponse.json(payload);

}
export async function POST(req: NextRequest) {

    const body = await req.json()

    const payload = await postCreateDiploma({ req, body });

    return NextResponse.json(payload);

}
