import { IErrorResponse, IApiResponse, IPagination } from "@/src/shared/lib/types/api";
import { DEFAULT_LIMIT_DIPLOMA, HEADERS } from "@/src/shared/constant/api.constant";
import { NextRequest, userAgent } from "next/server";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { IDiploma } from "../types/diploma";



export const getDiplomasApi = async (req: NextRequest) : Promise<IApiResponse<IPagination<IDiploma>>> => {


     const { device } = userAgent(req)




    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = device.type === "mobile" ? 3 : device.type === "tablet" ? 4 : Number(req.nextUrl.searchParams.get("limit")) || DEFAULT_LIMIT_DIPLOMA;

    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized as IErrorResponse

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            ...HEADERS.authorize(token.token)
        },
    });

    const data: IApiResponse<IPagination<IDiploma>> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data as IApiResponse<IPagination<IDiploma>>;
}