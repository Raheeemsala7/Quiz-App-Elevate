import { putUpdateDiploma } from "@/src/features/diploma/apis/diploma.api";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {

    const body = await req.json()

     const { id } = await context.params


    const payload = await putUpdateDiploma({ req, body, id  });

    return NextResponse.json(payload);

}