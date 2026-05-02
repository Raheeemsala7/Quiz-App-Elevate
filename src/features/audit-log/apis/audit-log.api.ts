import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { HEADERS } from "@/src/shared/constant/api.constant";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { IApiResponse, IPagination } from "@/src/shared/lib/types/api";
import { IAdminLog, IAuditLogItem } from "../types/audit";
import { IUser } from "../../auth/types/user";
import { getNextAuthToken } from "../../auth/util/auth.util";

export const getAuditLogsApi = async (req: NextRequest) => {
    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized;

    const page = req.nextUrl.searchParams.get("page") || "1";
    const limit = req.nextUrl.searchParams.get("limit") || "12";
    const category = req.nextUrl.searchParams.get("category") || "";
    const action = req.nextUrl.searchParams.get("action") || "";
    const actorUserId = req.nextUrl.searchParams.get("actorUserId") || "";
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const sortOrder = req.nextUrl.searchParams.get("sortOrder") || "desc";
    const search = req.nextUrl.searchParams.get("search") || "";

    const query = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortOrder,
    });

    if (category) query.append("category", category);
    if (action) query.append("action", action);
    if (actorUserId) query.append("actorUserId", actorUserId);
    if (search) query.append("search", search);

    const res = await fetch(
        `${process.env.API_URL}/admin/audit-logs?${query.toString()}`,
        {
            headers: {
                ...HEADERS.authorize(token.token),
            },
            cache: "no-store",
        }
    );

    const data: IApiResponse<IPagination<IAdminLog>> = await res.json();

    if (!res.ok || !data.status) {
        return data;
    }

    return data.payload;
};
export const getOneAuditLogApi = async (auditLogId: string) : Promise<IApiResponse<{auditLog : IAuditLogItem}>> => {
    const token = await getNextAuthToken();

    if (!token) return RESPONSES.unauthorized;

  

    const res = await fetch(
        `${process.env.API_URL}/admin/audit-logs/${auditLogId}`,
        {
            headers: {
                ...HEADERS.authorize(token.token),
            },
            cache: "no-store",
        }
    );

    const data: IApiResponse<{auditLog : IAuditLogItem}> = await res.json();

    if (!res.ok || !data.status) {
        return data;
    }

    return data as IApiResponse<{auditLog : IAuditLogItem}>
};




export const getUsersApi = async (req: NextRequest) => {
    const token = await getToken({ req });

    if (!token) return RESPONSES.unauthorized;

    const page = req.nextUrl.searchParams.get("page") || "1";
    const limit = req.nextUrl.searchParams.get("limit") || "30";
    const role = req.nextUrl.searchParams.get("role") || "";
    const search = req.nextUrl.searchParams.get("search") || "";
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const sortOrder = req.nextUrl.searchParams.get("sortOrder") || "desc";
    const actorUserId = req.nextUrl.searchParams.get("actorUserId") || ""

    const params = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortOrder,
    });

    if (role) params.append("role", role);
    if (search) params.append("search", search);

if (actorUserId) params.append("actorUserId", actorUserId);

    const res = await fetch(
        `${process.env.API_URL}/admin/users?${params.toString()}`,
        {
            headers: {
                ...HEADERS.authorize(token.token),
            },
        }
    );

    const data: IApiResponse<IPagination<IUser>> = await res.json();

    if (!res.ok || !data.status) {
        return data;
    }

    return data as IApiResponse<IPagination<IUser>>
};