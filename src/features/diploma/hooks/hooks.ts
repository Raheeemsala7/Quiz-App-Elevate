"use client"

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DIPLOMA_KEYS, DIPLOMA_KEYS_ADMIN } from "../apis/diploma.options";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LIMIT_DIPLOMA, DEFAULT_LIMIT_DIPLOMA_ADMIN, HEADERS } from "@/src/shared/constant/api.constant";
import { IApiResponse, IPagination } from "@/src/shared/lib/types/api";
import { IDiploma, MinimalDiploma } from "../types/diploma";
import { CreateDiplomaType } from "../schema/diploma.schema";





export const useDiplomasInfinite = () => {
    // Search params
    const searchParams = useSearchParams()

    // Variables
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT_DIPLOMA

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


export const useDiplomasAdmin = () => {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT_DIPLOMA_ADMIN;
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    return useQuery({
        queryKey: DIPLOMA_KEYS_ADMIN.list(page, limit, search, sortBy, sortOrder),
        queryFn: async () => {
            const res = await fetch(
                `/api/diploma?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
            );

            const data: IApiResponse<IPagination<IDiploma>> = await res.json();

            if (!data.status) {
                throw new Error(data.message || "Error");
            }

            return data.payload;
        },
    });
};





export const useDiplomasFilter = () => {
    return useQuery({
        queryKey: ["diplomas-filter"],

        queryFn: async () => {
            const res = await fetch("/api/diploma/minimal?page=1&limit=100");

            const data: IApiResponse<IDiploma[]> = await res.json();


            if (!data.status) {
                throw new Error(data.message || "Failed to fetch diplomas");
            }

            const formatted: MinimalDiploma[] = data.payload.map(
                (diploma) => ({
                    id: diploma.id,
                    title: diploma.title,
                })
            );

            return formatted;
        },

        staleTime: 1000 * 60 * 10,
    });
};



export const useCreateDiploma = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (values: CreateDiplomaType) => {
            const res = await fetch('/api/diploma', {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: IApiResponse<IDiploma> = await res.json()

            if (!data.status) {
                throw new Error(data.message || "Something wrong")
            }
            return data
        },
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["diplomas-admin"] })

        },
        onError(error) {
            console.log(error)
        }
    })
}

export const useUpdateDiploma = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ values, id }: { values: CreateDiplomaType, id: string }) => {
            const res = await fetch(`/api/diploma/${id}`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: IApiResponse<IDiploma> = await res.json()

            if (!data.status) {
                throw new Error(data.message || "Something wrong")
            }
            return data
        },
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["diplomas-admin"] })

        },
        onError(error) {
            console.log(error)
        }
    })
}