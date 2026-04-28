import { getDiplomasApi, getDiplomasMinimalApi } from "@/src/features/diploma/apis/diploma.api";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    const payload = await getDiplomasMinimalApi(req);


    return NextResponse.json(payload);


}