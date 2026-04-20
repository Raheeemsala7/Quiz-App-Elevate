import { IApiResponse, IErrorResponse } from "@/src/shared/lib/types/api"
import { IPayloadSubmissions, IQuestion, IResponseSubmissions } from "../types/questions"
import { HEADERS } from "@/src/shared/constant/api.constant"
import { getNextAuthToken } from "../../auth/util/auth.util"
import { getToken } from "next-auth/jwt"
import { RESPONSES } from "@/src/shared/constant/api.responses"
import { NextRequest } from "next/server"



export const getQuestions = async (examId: string) => {

    const token = await getNextAuthToken()

    if (!token) {
        throw new Error("No token provided")
    }


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}`, {
        headers: {
            ...HEADERS.authorize(token.token)
        }
    })

    const data: IApiResponse<IQuestion> = await res.json()

    if (!data.status) {
        throw new Error(data.message || "Something went wrong");
    }


    return data.payload
}



export const postSubmissions = async ({ req , body }: { req: NextRequest; body: IPayloadSubmissions; }) => {

    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized as IErrorResponse

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        }
    })

    const data: IResponseSubmissions = await res.json()

    return data
}