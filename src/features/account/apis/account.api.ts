import { HEADERS } from "@/src/shared/constant/api.constant";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { IApiResponse, IErrorResponse } from "@/src/shared/lib/types/api";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { IPayloadEmailRequest, IPayloadUpdatedProfile, IProfile, IRequestEmailResponse } from "../types/account";




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

export const updateProfile = async ({ req, body }: { req: NextRequest; body: IPayloadUpdatedProfile; }) => {
    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized as IErrorResponse

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body: JSON.stringify(body),
    })


    const data: IApiResponse<IProfile> = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data

}


export const removeAccount = async (req: NextRequest) => {

    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized as IErrorResponse


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/account`, {
        method: "DELETE",
        headers: {
            ...HEADERS.authorize(token.token)
        }
    })

    const data: IApiResponse<{ message: string }> = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data
}


export const changeEmailRequest = async ({ req, body }: { req: NextRequest; body: IPayloadEmailRequest; }) => {
    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized as IErrorResponse

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/request`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body: JSON.stringify(body),
    })


    const data: IApiResponse<IRequestEmailResponse> = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data
}

export const confirmEmailRequest = async ({ req, body }: { req: NextRequest; body: IPayloadEmailRequest; }) => {
    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized as IErrorResponse

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/confirm`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body: JSON.stringify(body),
    })


    const data: IApiResponse<IRequestEmailResponse> = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data
}