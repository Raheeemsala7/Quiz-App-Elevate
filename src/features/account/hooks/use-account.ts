"use client"

import { IApiResponse } from "@/src/shared/lib/types/api"
import { useQuery } from "@tanstack/react-query"
import { IProfile } from "../types/account"



export const useGetAccount = () => {

    return useQuery({
        queryKey: ["account"],
        queryFn: async () => {
            const res = await fetch("/api/account")

            const data: IApiResponse<IProfile> = await res.json()
            if (!data.status) {
                throw new Error(data.message || "Error")
            }

            return data.payload.user
        }
    })
}