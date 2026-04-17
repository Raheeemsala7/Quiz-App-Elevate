import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface IQuestion extends Timestamp {
    id: string
    text: string
    examId: string
    immutable: true,
    answers: IAnswer[]
}

interface IAnswer {
    id: string
    text: string
}