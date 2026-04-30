import { getDiplomasApi } from "@/src/features/diploma/apis/diploma.api";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req : NextRequest) {

    const payload = await getDiplomasApi(req);

    return NextResponse.json(payload);

}
export async function Post(req : NextRequest) {

    const payload = await getDiplomasApi(req);

    return NextResponse.json(payload);

}