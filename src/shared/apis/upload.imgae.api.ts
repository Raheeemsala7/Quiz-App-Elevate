import { NextRequest } from "next/server";
import { HEADERS } from "../constant/api.constant";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "../constant/api.responses";
import { IErrorResponse } from "../lib/types/api";
import { uploadImageSchema } from "../lib/schema/image.schema";



export const uploadImageAPi = async (req : NextRequest , formData: FormData,) => {

    const token = await getToken({req})


    if (!token) return  RESPONSES.unauthorized as IErrorResponse

    const res = await fetch(`${process.env.API_URL}/upload` , {
        method  :"POST",
        headers : {
            ...HEADERS.authorize(token.token)
        },
        body : formData
    })

    const data = await res.json()

    if (!res.status) {
        throw new Error(data.message || "Something went wrong");
    }

    return data
}