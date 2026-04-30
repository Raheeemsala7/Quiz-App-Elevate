import { useMutation } from "@tanstack/react-query"
import { UploadImageType } from "../lib/schema/image.schema"
import axios from "axios"
import { IApiResponse } from "../lib/types/api"
import { IUploadImageResponse } from "../lib/types/uoload-image"
import { useState } from "react"



export const useUploadImage = () => {
    const [uploadProgress, setUploadProgress] = useState(0)
    const mutate = useMutation({
        mutationFn: async (values: UploadImageType) => {
            const formData = new FormData()
            formData.append("image", values.image)

            const res = await axios.post<IApiResponse<IUploadImageResponse>>(`/api/upload`, formData, {
                onUploadProgress: (progressEvent) => {
                    setUploadProgress(Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1)))
                }
            })

            if (res.data.status === false) throw new Error(res.data.message)


            return res.data.payload
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })

    return {
        ...mutate,
        mutate,
        uploadProgress,
    }
}

