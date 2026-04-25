"use client"

import { IApiResponse, IErrorResponse } from "@/src/shared/lib/types/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IPayloadUpdatedProfile, IProfile } from "../types/account"



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
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5

    })
}



export const useUpdateProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: IPayloadUpdatedProfile) => {
            const response = await fetch("/api/account", {
                method: "PATCH",
                body: JSON.stringify(data)
            })
            const result = await response.json();

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

            return result as IApiResponse<IProfile>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["account"] })
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


interface IChangeEmailRequest {
    newEmail: string
}

export const useChangeEmailRequest = () => {
    return useMutation({
        mutationFn: async (data: IChangeEmailRequest) => {
            const response = await fetch("/api/email/request", {
                method: "POST",
                body: JSON.stringify(data)
            })
            const result = await response.json();
            
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
            
            return result
        }
    })
}
interface IChangeEmailConfirm {
    code: string
}
export const useChangeEmailConfirm = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: IChangeEmailConfirm) => {
            const response = await fetch("/api/email/confirm", {
                method: "POST",
                body: JSON.stringify(data)
            })
            const result = await response.json();

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

            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["account"] })
        }
    })
}