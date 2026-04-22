import { getProfile } from "@/src/features/account/apis/account.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    
    const payload = await getProfile(req)

    return NextResponse.json(payload)
}