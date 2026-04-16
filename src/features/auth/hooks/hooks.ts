"use client"

import { useMutation } from "@tanstack/react-query"
import { registerApi, sendEmailVerificationApi, verifyCodeEmailApi } from "../apis/auth.api"
import { IRegisterType } from "@/src/shared/lib/interface"
import { IAuthResponse } from "@/src/features/auth/types/auth"
import { IErrorResponse, SuccessResponse } from "@/src/shared/lib/types/api"



export const sendEmailVerification = () => {
    return useMutation({
        mutationKey: ["sendEmailVerification"],
        mutationFn: sendEmailVerificationApi,
    })

}

interface VerifyCodeInput {
    email: string
    code: string
}
export const verifyCodeEmail = () => {
    return useMutation<SuccessResponse<void>, IErrorResponse, VerifyCodeInput>({
        mutationKey: ["verifyCodeEmail"],
        mutationFn: verifyCodeEmailApi,
    })
}


export const register = () => {
    return useMutation<SuccessResponse<IAuthResponse>, IErrorResponse, IRegisterType>({
        mutationKey: ["register"],
        mutationFn: registerApi,
    })
}