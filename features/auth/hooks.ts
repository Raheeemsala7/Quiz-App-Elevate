"use client"

import { useMutation } from "@tanstack/react-query"
import { sendEmailVerificationApi, verifyCodeEmailApi } from "./api"



export const sendEmailVerification = () => {

    return useMutation({
        mutationKey: ["sendEmailVerification"],
        mutationFn:  sendEmailVerificationApi,
    })

}
export const verifyCodeEmail = () => {

    return useMutation({
        mutationKey: ["verifyCodeEmail"],
        mutationFn:  verifyCodeEmailApi,
    })

}