import { IApiResponse } from "@/src/shared/lib/types/api"
import { IQuestion } from "../types/questions"
import { HEADERS } from "@/src/shared/constant/api.constant"
import { getNextAuthToken } from "../../auth/util/auth.util"



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