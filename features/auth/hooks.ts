"use client"

import { useMutation } from "@tanstack/react-query"
import { sendEmailVerificationApi, verifyCodeEmailApi } from "./api"



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