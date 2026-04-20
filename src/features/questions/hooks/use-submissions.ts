"use client"

import { useMutation } from "@tanstack/react-query"
import { IPayloadSubmissions, IResponseSubmissions } from "../types/questions"
import { IErrorResponse } from "@/src/shared/lib/types/api"
import { HEADERS } from "@/src/shared/constant/api.constant"


export const useSubmissions = () => {


    return useMutation<IResponseSubmissions, IErrorResponse, IPayloadSubmissions>({
        mutationFn: async (data: IPayloadSubmissions): Promise<IResponseSubmissions> => {
            const response = await fetch("/api/submissions", {
                method: "POST",
                headers: {
                    ...HEADERS.JsonBody,
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw errorData as IErrorResponse;
            }

            const payload: IResponseSubmissions = await response.json();
            return payload;
        },
    })
}