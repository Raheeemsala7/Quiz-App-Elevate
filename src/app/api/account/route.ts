import { getProfile, removeAccount } from "@/src/features/account/apis/account.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const payload = await getProfile(req)

    return NextResponse.json(payload)
}


export async function DELETE(req: NextRequest) {
    try {
        const payload = await removeAccount(req)

        return NextResponse.json(payload)
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        )
    }
}