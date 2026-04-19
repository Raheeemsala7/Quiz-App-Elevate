"use client"

import { useInfiniteQuery } from "@tanstack/react-query";
import { DIPLOMA_KEYS } from "../apis/diploma.options";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LIMIT_DIPLOMA } from "@/src/shared/constant/api.constant";
import { IApiResponse, IPagination } from "@/src/shared/lib/types/api";
import { IDiploma } from "@/src/shared/lib/types/diploma";





export const useDiplomasInfinite = () => {
    // Search params
    const searchParams = useSearchParams()

    // Variables
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT_DIPLOMA

    console.log("page " + page)
    console.log("limit " + limit)

    return useInfiniteQuery({
        queryKey: DIPLOMA_KEYS.list(page, limit),
        queryFn: async ({ pageParam }) => {

            const res = await fetch(`/api/diploma/?page=${pageParam}&limit=${limit}`)

            const data: IApiResponse<IPagination<IDiploma>> = await res.json()

            if (!data.status) {
                throw new Error(data.message || "Error")
            }

            return data.payload
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page === lastPage.metadata.totalPages) {
                return undefined
            }
            return lastPage.metadata.page + 1
        }
    })
};