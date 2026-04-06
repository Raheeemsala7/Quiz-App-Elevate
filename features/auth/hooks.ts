"use client"

import { useMutation } from "@tanstack/react-query"
import { sendEmailVerificationApi } from "./api"



export const sendEmailVerification = () => {

    return useMutation({
        mutationKey: ["sendEmailVerification"],
        mutationFn:  sendEmailVerificationApi,
    })

}