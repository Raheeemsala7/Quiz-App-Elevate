"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ExamQuestion, IQueItem, IQuestionBulk, IQuestionInfo, IQuestionUpdate } from "../types/questions"
import { HEADERS } from "@/src/shared/constant/api.constant"
import { IApiResponse } from "@/src/shared/lib/types/api"




export const useGetQuestions = ({ examId }: { examId: string }) => {
    return useQuery({
        queryKey: ["admin-questions" , examId],
        queryFn: async () => {
            const res = await fetch(`/api/exams/${examId}/questions`)
            const data:  IApiResponse<{questions : IQueItem[]}> = await res.json()
            if (!data.status || !res.ok) {
                throw new Error(data.message || "Some error occurred")
            }
            return data as IApiResponse<{questions : IQueItem[]}>
        },
    })
}


export const useCreateSingleQuestion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ values, id }: { values: ExamQuestion, id: string }) => {
            const res = await fetch(`/api/exams/${id}/question`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: IApiResponse<IQuestionInfo> = await res.json()

            if (!data.status  || !res.ok) {
                throw new Error(data.message || "Error")
            }
            return data
        },
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] })
        },
        onError(error) {
            console.log(error)
        }
    })
}
export const useCreateMultiBulkQuestion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ values, id }: { values: IQuestionBulk, id: string }) => {
            const res = await fetch(`/api/exams/${id}/questions`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: IApiResponse<IQuestionInfo> = await res.json()

            if (!data.status  || !res.ok) {
                throw new Error(data.message || "Error")
            }
            return data
        },
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] })
        },
        onError(error) {
            console.log(error)
        }
    })
}



export const useUpdateSingleQuestion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ values, id }: { values: IQuestionUpdate, id: string }) => {
            const res = await fetch(`/api/exams/${id}/question`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: IApiResponse<IQuestionInfo> = await res.json()

            if (!data.status  || !res.ok) {
                throw new Error(data.message || "Error")
            }
            return data
        },
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] })
        },
        onError(error) {
            console.log(error)
        }
    })
}


