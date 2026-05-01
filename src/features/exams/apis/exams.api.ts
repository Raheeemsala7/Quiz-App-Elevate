import { IApiResponse, IErrorResponse, IPagination } from "@/src/shared/lib/types/api"
import { IExam, IExamInfo } from "../types/exam"
import { NextRequest, userAgent } from "next/server"
import { getToken } from "next-auth/jwt"
import { RESPONSES } from "@/src/shared/constant/api.responses"
import { DEFAULT_LIMIT_DIPLOMA, DEFAULT_LIMIT_DIPLOMA_ADMIN, HEADERS } from "@/src/shared/constant/api.constant"
import { getNextAuthToken } from "../../auth/util/auth.util"


export const getExamsApi = async (req: NextRequest) => {
    const { device } = userAgent(req);

    const diplomaId = req.nextUrl.searchParams.get("diplomaId") || "";

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;


    const limit =
        device.type === "mobile"
            ? 3
            : device.type === "tablet"
                ? 4
                : DEFAULT_LIMIT_DIPLOMA_ADMIN || DEFAULT_LIMIT_DIPLOMA;

    // Queries
    const search = req.nextUrl.searchParams.get("search")?.trim() || "";
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const sortOrder = req.nextUrl.searchParams.get("sortOrder") || "desc";

    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized;

    // ✅ validation
    const allowedSortBy = ["title", "createdAt", "questions"];
    const allowedSortOrder = ["asc", "desc"];

    const finalSortBy = allowedSortBy.includes(sortBy)
        ? sortBy
        : "createdAt";

    const finalSortOrder = allowedSortOrder.includes(sortOrder)
        ? sortOrder
        : "desc";

    // 🌐 build query
    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy: finalSortBy,
        sortOrder: finalSortOrder,
    });

    if (search) query.append("search", search);
    if (diplomaId) query.append("diplomaId", diplomaId);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exams?${query.toString()}`,
        {
            method: "GET",
            headers: {
                ...HEADERS.authorize(token.token),
            },
        }
    );

    const data: IApiResponse<IPagination<IExam>> = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};


export const getExamById = async (examId: string) => {
    const token = await getNextAuthToken()

    if (!token) throw new Error("No token provided.")


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}`, {
        method: "GET",
        headers: {
            ...HEADERS.authorize(token.token)
        }
    })

    console.log(process.env.NEXT_PUBLIC_API_URL)


    const data: IApiResponse<IExamInfo> = await res.json()

    if (!data.status || !res.ok) {
        return data as IErrorResponse
    }


    return data as IApiResponse<IExamInfo>
}



