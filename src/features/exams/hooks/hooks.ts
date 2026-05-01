"use client"

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EXAMS_KEYS, EXAMS_KEYS_ADMIN } from "../apis/exams.options"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LIMIT_DIPLOMA, HEADERS } from "@/src/shared/constant/api.constant"
import { IApiResponse, IPagination } from "@/src/shared/lib/types/api"
import { IExam, IExamInfo } from "../types/exam"
import { IDiploma } from "../../diploma/types/diploma"
import { CreateExamType } from "../schema/exam.diploma"




export const useExamsInfinite = (diplomaId: string) => {
    // searchParams
    const searchParams = useSearchParams()

    console.log("diploma client" + diplomaId)

    // variables
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT_DIPLOMA



    return useInfiniteQuery({
        queryKey: EXAMS_KEYS.list(page, limit, diplomaId),
        queryFn: async ({ pageParam }) => {
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



export const useExamsAdmin = () => {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;

    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const diplomaId = searchParams.get("diplomaId") || "";

    return useQuery({
        queryKey: EXAMS_KEYS_ADMIN.list(page, limit, search, sortBy, sortOrder, diplomaId),

        queryFn: async () => {
            const res = await fetch(
                `/api/exams?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&diplomaId=${diplomaId}`
            );

            const data: IApiResponse<IPagination<IExam>> = await res.json();

            if (!data.status) {
                throw new Error(data.message || "Error fetching exams");
            }

            return data.payload;
        },

    });
};



export const useCreateExam = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (values: CreateExamType) => {
            const res = await fetch('/api/exams', {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: IApiResponse<IExamInfo> = await res.json()

            if (!data.status) {
                throw new Error(data.message || "Something wrong")
            }
            return data 
        },
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] })

        },
        onError(error) {
            console.log(error)
        }
    })
}

export const useUpdateExam = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ values, id }: { values: CreateExamType, id: string }) => {
            const res = await fetch(`/api/exams/${id}`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: IApiResponse<IExamInfo> = await res.json()

            if (!data.status) {
                throw new Error(data.message || "Something wrong")
            }
            return data
        },
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] })

        },
        onError(error) {
            console.log(error)
        }
    })
}
export const useDeleteExam = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/exams/${id}`, {
                method: "DELETE",
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: IApiResponse<{ message: string }> = await res.json()

            if (!data.status) {
                throw new Error(data.message || "Something wrong")
            }
            return data
        },
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] })
        },
        onError(error) {
            console.log(error)
        }
    })
}