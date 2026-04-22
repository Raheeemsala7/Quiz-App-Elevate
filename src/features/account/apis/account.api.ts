import { HEADERS } from "@/src/shared/constant/api.constant";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { IApiResponse, IErrorResponse } from "@/src/shared/lib/types/api";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { IProfile } from "../types/account";




export const getProfile = async (req: NextRequest) => {

    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized as IErrorResponse

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        }
    })


    const data: IApiResponse<IProfile> = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data

}