"use client"


import React, { useEffect } from 'react'
import { useGetQuestions } from '../hooks/use-question'
import { Loader2, Plus } from 'lucide-react'
import { ExamQuestion, IQueItem } from '../types/questions'
import { Button } from '@/src/shared/components/ui/button'
import { Label } from '@/src/shared/components/ui/label'
import { Input } from '@/src/shared/components/ui/input'
import { cn } from '@/src/shared/lib/utils'

interface IProps {
    id: string
    multiQuestion: IQueItem[]
    setMultiQuestion: React.Dispatch<
        React.SetStateAction<IQueItem[]>
    >
    singleQuestion: ExamQuestion
    setSingleQuestion: (question: ExamQuestion) => void
    setOriginalQuestions: (
        questions: IQueItem[]
    ) => void
}
const QuestionBulkMode = ({ id, multiQuestion, setMultiQuestion, singleQuestion, setSingleQuestion, setOriginalQuestions }: IProps) => {


    const { data: questions, isLoading, isError, error } = useGetQuestions({ examId: id })


    useEffect(() => {
        if (questions?.status) {
            setMultiQuestion(questions.payload.questions)
            setOriginalQuestions(questions.payload.questions)

            if (questions.payload.questions.length > 0) {
                setSingleQuestion({
                    id: questions.payload.questions[0].id,
                    text: questions.payload.questions[0].text,
                    examId : id,
                    immutable: false,
                    answers: questions.payload.questions[0].answers
                })
            }

        }

       
    }, [questions, setMultiQuestion])



        console.log("RENDER FORM COMP BULK QUESTION INFO")




    if (isLoading) {
        return (
            <div className='flex items-center gap-2 p-6'>
                <Loader2 className='animate-spin size-4' />
                Loading questions...
            </div>
        )
    }

    if (isError) {
        return (
            <div className='p-6 text-red-500'>
                {(error as Error).message || "Failed to load questions"}
            </div>
        )
    }


    console.log(multiQuestion)

    return (
        <div className='bg-white space-y-4'>
            <div className='flex'>
                <div className="flex-1 flex items-center ">
                    {multiQuestion.map((que, index) => (
                        <div className={cn('h-10 w-31 py-2.5 text-center border-r border-gray-200',
                            singleQuestion.id === que.id ? 'bg-blue-50 text-blue-600 border border-blue-500' : ''
                        )} onClick={() => {
                            setSingleQuestion({
                                id: que.id,
                                text: que.text,
                                examId: id,
                                immutable: false,
                                answers: que.answers,
                                isNew: true
                            })
                        }}>
                            Q{index + 1}
                        </div>
                    ))}
                </div>
                <Button size={"icon"} className='bg-gray-200 text-black' onClick={() => {
                    const newQuestion = {
                        id: Date.now().toString(),
                        text: '',
                        answers: [],
                        examId: id,
                        immutable: false,
                        isNew: true,
                    }

                    setSingleQuestion(newQuestion)
                    setMultiQuestion([...multiQuestion, newQuestion])
                }}>
                    <Plus />
                </Button>


            </div>
            <div className='space-y-2 mb-4'>
                <Label >Question Headline</Label>
                <Input value={singleQuestion.text} onChange={(e) => {
                    const updated = {
                        ...singleQuestion,
                        text: e.target.value,
                    }

                    setSingleQuestion(updated)

                    setMultiQuestion((prev: IQueItem[]) =>
                        prev.map((q) =>
                            q.id === updated.id
                                ? { ...q, text: updated.text }
                                : q
                        )
                    )
                }}
                />
            </div>
        </div>
    )
}

export default QuestionBulkMode