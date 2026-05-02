"use client";

import { IApiResponse, IPagination } from "@/src/shared/lib/types/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { IUser } from "../../auth/types/user";

export const useGetAuditLogs = () => {
    const searchParams = useSearchParams();

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "12";
    const category = searchParams.get("category") || "";
    const action = searchParams.get("action") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const search = searchParams.get("search") || "";

    return useQuery({
        queryKey: [
            "auditLogs",
            page,
            limit,
            category,
            action,
            sortBy,
            sortOrder,
            search,
        ],
        queryFn: async () => {
            const params = new URLSearchParams({
                page,
                limit,
                sortBy,
                sortOrder,
            });

            if (category) params.append("category", category);
            if (action) params.append("action", action);
            if (search) params.append("search", search);

            const res = await fetch(`/api/audit-logs?${params.toString()}`);

            const data = await res.json();

            return data;
        },
    });
};


export const useUsersSelect = (search: string) => {
    return useQuery({
        queryKey: ["users-select", search],
        queryFn: async () => {
            const params = new URLSearchParams({
                search,
                limit: "30",
            });

            const res = await fetch(`/api/users?${params.toString()}`);

            const data:  IApiResponse<IPagination<IUser>>  = await res.json();

            if (!data.status) {
                return data
            }

            return data as IApiResponse<IPagination<IUser>>
        },
    });
};