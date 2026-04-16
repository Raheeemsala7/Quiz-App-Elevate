import { IApiResponse, IPagination } from "@/src/shared/lib/types/api"
import { IExam } from "../types/exam"
import { NextRequest, userAgent } from "next/server"
import { getToken } from "next-auth/jwt"
import { RESPONSES } from "@/src/shared/constant/api.responses"
import { DEFAULT_LIMIT_DIPLOMA, HEADERS } from "@/src/shared/constant/api.constant"


export const getExams = async (req: NextRequest) => {

    const {device} = await userAgent(req)

    const diplomaId = req.nextUrl.searchParams.get("diplomaId")
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = device.type === "mobile" ? 3 : device.type === "tablet" ? 4 : Number(req.nextUrl.searchParams.get("limit")) || DEFAULT_LIMIT_DIPLOMA;

        console.log("###############################")
        console.log("diploma server" + diplomaId)
        console.log("###############################")


    const token = await getToken({ req })

    if (!token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams?diplomaId=${diplomaId}&page=${page}&limit=${limit}`, {
        method : "GET",
        headers: {
            ...HEADERS.authorize(token.token)
        }
    })

    const data: IApiResponse<IPagination<IExam>> = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data as IApiResponse<IPagination<IExam>>;

}