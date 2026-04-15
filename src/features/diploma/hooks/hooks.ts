"use client"

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import { IDiplomasResponse } from "@/src/shared/lib/types/diploma";
import { getDiplomasApi } from "../apis/diploma.api";



export const useDiplomasInfinite = () => {
    return useInfiniteQuery
    <IApiResponse<IDiplomasResponse>,
        ErrorResponse,
        InfiniteData<IApiResponse<IDiplomasResponse>>, // ✅ Selected data
        string[],
        number
        > ({
            queryKey: ["diplomas"],
            queryFn: ({ pageParam = 1 }) => getDiplomasApi(pageParam),
            initialPageParam: 1,

            getNextPageParam: (lastPage) => {
                if (!lastPage.status) return undefined;

                const { page, totalPages } = lastPage.payload.metadata; // ✅ أضفنا .metadata



                if (page < totalPages) {
                    return page + 1;
                }

                return undefined;
            },
        });
};