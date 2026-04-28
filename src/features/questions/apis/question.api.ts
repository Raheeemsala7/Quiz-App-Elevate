import { IApiResponse, IErrorResponse } from "@/src/shared/lib/types/api"
import { IPayloadSubmissions, IQuestion, IResponseSubmissions } from "../types/questions"
import { HEADERS } from "@/src/shared/constant/api.constant"
import { getNextAuthToken } from "../../auth/util/auth.util"
import { getToken } from "next-auth/jwt"
import { RESPONSES } from "@/src/shared/constant/api.responses"
import { NextRequest } from "next/server"



export const getQuestions = async (
    examId: string,
    options?: {
        search?: string;
        sortBy?: "title" | "createdAt";
        sortOrder?: "asc" | "desc";
    }
) => {
    const token = await getNextAuthToken();

    if (!token) {
        throw new Error("No token provided");
    }

    const query = new URLSearchParams();

    if (options?.search?.trim()) {
        query.append("search", options.search.trim());
    }

    if (options?.sortBy) {
        query.append("sortBy", options.sortBy);
    }

    if (options?.sortOrder) {
        query.append("sortOrder", options.sortOrder);
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}?${query.toString()}`,
        {
            headers: {
                ...HEADERS.authorize(token.token),
            },
            cache: "no-store", // مهم علشان دايمًا يجيب أحدث بيانات
        }
    );

    const data: IApiResponse<IQuestion> = await res.json();

    if (!data.status) {
        throw new Error(data.message || "Something went wrong");
    }

    return data.payload;
};



export const postSubmissions = async ({ req, body }: { req: NextRequest; body: IPayloadSubmissions; }) => {

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


    const data = await res.json()

    if (!res.ok) {
        throw {
            status: false,
            code: data.code || res.status,
            message: data.message || "Something went wrong",
            errors: data.errors || [],
        } as IErrorResponse;
    }
    return data.payload as IResponseSubmissions
}