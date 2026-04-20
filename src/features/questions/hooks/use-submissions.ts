"use client"

import { useMutation } from "@tanstack/react-query"
import { IPayloadSubmissions, IResponseSubmissions } from "../types/questions"
import { IErrorResponse } from "@/src/shared/lib/types/api"


export const useSubmissions = () =>  {


    return useMutation<IResponseSubmissions,IErrorResponse,IPayloadSubmissions>({
        mutationFn : 
    })
}