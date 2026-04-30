import { uploadImageAPi } from "@/src/shared/apis/upload.imgae.api";
import { uploadImageSchema } from "@/src/shared/lib/schema/image.schema";
import { IErrorResponse } from "@/src/shared/lib/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const formData = await req.formData()

    const result = uploadImageSchema.safeParse({image : formData.get("image")})

    if (!result.success) {
        return NextResponse.json({
            code:400,
            status : false,
            message: result.error.message
        } satisfies IErrorResponse, { status: 400 })
    }

    const payload = await uploadImageAPi(req , formData)


    return NextResponse.json(payload)

}