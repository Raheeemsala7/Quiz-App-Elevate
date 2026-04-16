"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { EXAMS_KEYS } from "../apis/exams.options"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LIMIT_DIPLOMA } from "@/src/shared/constant/api.constant"
import { IApiResponse, IPagination } from "@/src/shared/lib/types/api"
import { IExam } from "../types/exam"




export const useExamsInfinite = (diplomaId: string) => {
    // searchParams
    const searchParams = useSearchParams()

    console.log("diploma client" + diplomaId)

    // variables
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT_DIPLOMA



    return useInfiniteQuery({
        queryKey: EXAMS_KEYS.list(page, limit, diplomaId),
        queryFn: async ({pageParam}) => {
            const res = await fetch(`/api/exams/?diplomaId=${diplomaId}&page=${pageParam}&limit=${limit}`)

            const data: IApiResponse<IPagination<IExam>> = await res.json()

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
}
