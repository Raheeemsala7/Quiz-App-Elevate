import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface IQuestion extends Timestamp {
    questions: {
        id: string
        text: string
        examId: string
        immutable: true,
        answers: IAnswer[]
    }[]
}

interface IAnswer {
    id: string
    text: string
}


export interface IQueItem {
     id: string
        text: string
        examId: string
        immutable: true,
        answers: IAnswer[]
}