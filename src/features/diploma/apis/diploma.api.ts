import { IErrorResponse, IApiResponse, IPagination } from "@/src/shared/lib/types/api";
import { DEFAULT_LIMIT_DIPLOMA, DEFAULT_LIMIT_DIPLOMA_ADMIN, HEADERS } from "@/src/shared/constant/api.constant";
import { NextRequest, userAgent } from "next/server";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { IDiploma } from "../types/diploma";
import { getNextAuthToken } from "../../auth/util/auth.util";



export const getDiplomasApi = async (req: NextRequest): Promise<IApiResponse<IPagination<IDiploma>>> => {


    const { device } = userAgent(req)


    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized as IErrorResponse
    const isAdmin = token.user.role === "ADMIN";


    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limitFromQuery = Number(req.nextUrl.searchParams.get("limit"));
    const isDesktop = !device.type || device.type === "desktop";
    const search = req.nextUrl.searchParams.get("search")?.trim() || "";
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const sortOrder = req.nextUrl.searchParams.get("sortOrder") || "desc";




    const limit = isAdmin
        ? isDesktop
            ? DEFAULT_LIMIT_DIPLOMA_ADMIN
            : device.type === "mobile"
                ? 3
                : device.type === "tablet"
                    ? 4
                    : DEFAULT_LIMIT_DIPLOMA_ADMIN
        : device.type === "mobile"
            ? 3
            : device.type === "tablet"
                ? 4
                : limitFromQuery || DEFAULT_LIMIT_DIPLOMA;

    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy,
        sortOrder,
    });

    if (search) {
        query.append("search", search);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas?${query.toString()}`, {
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



export const getDiplomaApi = async (id: string) => {

    const token = await getNextAuthToken()

    if (!token) return RESPONSES.unauthorized as IErrorResponse


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`, {
        headers: {
            ...HEADERS.authorize(token.token)
        }
    })

    const data: IApiResponse<{ diploma: IDiploma }> = await res.json();
    if (!data.status) {
        throw new Error(data.message || "Something went wrong");
    }
    return data as IApiResponse<{ diploma: IDiploma }>;

}


export const getDiplomasMinimalApi = async (req: NextRequest) => {
    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/diplomas?page=1&limit=100`,
        {
            headers: {
                ...HEADERS.authorize(token.token),
            },
        }
    );


    const data : IApiResponse<IPagination<IDiploma>> = await res.json();

        if (!data.status) {
        throw new Error(data.message || "Something went wrong");
    }

    return {
        ...data,
        payload: data.payload.data.map((d: IDiploma) => ({
            id: d.id,
            title: d.title,
        })),
    };
};