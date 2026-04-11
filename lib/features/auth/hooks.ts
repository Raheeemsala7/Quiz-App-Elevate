"use client"

import { useMutation } from "@tanstack/react-query"
import { registerApi, sendEmailVerificationApi, verifyCodeEmailApi } from "./api"
import { IRegisterType } from "@/lib/interface"
import { IAuthResponse } from "@/lib/types/auth"



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
    return useMutation<SuccessResponse<void>, ErrorResponse, VerifyCodeInput>({
        mutationKey: ["verifyCodeEmail"],
        mutationFn: verifyCodeEmailApi,
    })
}


export const register = () => {
    return useMutation<SuccessResponse<IAuthResponse>, ErrorResponse, IRegisterType>({
        mutationKey: ["register"],
        mutationFn: registerApi,
    })
}