"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ExamQuestion, IQuestion, IQuestionInfo } from "../types/questions"
import { HEADERS } from "@/src/shared/constant/api.constant"
import { IApiResponse } from "@/src/shared/lib/types/api"




export const useGetQuestions = ({ examId }: { examId: string }) => {
    return useQuery({
        queryKey: ["admin-questions"],
        queryFn: async () => {
            const res = await fetch(`/api/exams/${examId}/question`)
            const data: IApiResponse<IQuestion[]> = await res.json()
            if (!data.status || !res.ok) {
                throw new Error(data.message || "Error")
            }
            return data
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


