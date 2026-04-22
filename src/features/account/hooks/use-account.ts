"use client"

import { IApiResponse, IErrorResponse } from "@/src/shared/lib/types/api"
import { useMutation, useQuery } from "@tanstack/react-query"
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


export const useRemoveAccount = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetch("/api/account", {
                method: "DELETE",
            })


            const result = await response.json();

            console.log("STATUS:", response.status);
            console.log("OK:", response.ok);
            console.log("DATA:", result);

            if (!response.ok) {
                const error: IErrorResponse = {
                    status: false,
                    code: result.code || response.status,
                    message: result.message || "Request failed",
                    errors: result.errors || [],
                };

                const err = new Error(error.message) as Error & IErrorResponse;
                Object.assign(err, error);

                throw err;
            }

            return result as { message: string };
        }
    })
}