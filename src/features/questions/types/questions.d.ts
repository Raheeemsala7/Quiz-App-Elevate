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


export interface IPayloadSubmissions {
    examId: string;
    answers: {
        questionId: string;
        answerId: string;
    }[]
    startedAt: string

}




interface ExamBrief {
    id: string;
    title: string;
    duration: number;
}

interface Submission {
    id: string;
    userId: string;
    examId: string;
    examTitle: string;
    exam: ExamBrief;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    startedAt: string;
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
}

interface QuestionAnalytics {
    questionId: string;
    questionText: string;
    selectedAnswer: any;
    isCorrect: boolean;
    correctAnswer: any;
}
export interface IResponseSubmissions {
    message: string;
    submission: Submission;
    analytics: QuestionAnalytics[];
}