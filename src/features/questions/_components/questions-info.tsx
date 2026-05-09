"use client"
import { Button, buttonVariants } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/input'
import { Label } from '@/src/shared/components/ui/label'
import { cn } from '@/src/shared/lib/utils'
import { CheckCheck, CheckIcon, CopyPlus, Loader2, Plus, SaveIcon, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Answer, ExamQuestion, IQueItem } from '../types/questions'
import { ExamsCombobox } from './ExamsCombobox'
import { useCreateMultiBulkQuestion, useCreateSingleQuestion, useGetQuestions, useUpdateSingleQuestion } from '../hooks/use-question'
import { toast } from 'sonner'
import QuestionBulkMode from './questionBulkMode'


const QuestionsInfo = ({ id, diplomaId }: { id: string, diplomaId: string }) => {

    const [bulkMode, setBulkMode] = useState(false)
    const [singleQuestion, setSingleQuestion] = useState<ExamQuestion>({
        id: "",
        text: '',
        examId: id,
        immutable: false,
        answers: [],
        isNew: true,
    })
    const [newAnswerText, setNewAnswerText] = useState('')
    const [showNewAnswerInput, setShowNewAnswerInput] = useState(false)
    const [selectExamId, setSelectExamId] = useState<string>(id || "");
    const { mutateAsync: createSingleQuestion, isPending: isSinglePending } = useCreateSingleQuestion()
    const { mutateAsync: createBulkQuestion, isPending: isBulkQuestionPending } = useCreateMultiBulkQuestion()
    const { mutateAsync: updateSingleQuestion, isPending: isUpdateQuestionPending } = useUpdateSingleQuestion()

    const [multiQuestion, setMultiQuestion] = useState<IQueItem[]>([])
    const [originalQuestions, setOriginalQuestions] =
        useState<IQueItem[]>([])

    console.log("RENDER FORM COM QUESTION INFO")



    const handleAddAnswer = () => {
        if (newAnswerText.trim() === "")
            return

        const newAnswer: Answer = {
            id: Date.now().toString(),
            text: newAnswerText,
            isCorrect: false,
        }

        const updatedQuestion = {
            ...singleQuestion,
            examId: id,
            immutable: false,
            answers: [
                ...singleQuestion.answers,
                newAnswer,
            ],
        }

        setSingleQuestion(updatedQuestion)

        if (bulkMode) {
            setMultiQuestion((prev) =>
                prev.map((q) =>
                    q.id === updatedQuestion.id
                        ? updatedQuestion
                        : q
                )
            )
        }

        setNewAnswerText("")
        setShowNewAnswerInput(false)
    }

 const handleRemoveAnswer = (answerId: string) => {

    const updatedQuestion = {
        ...singleQuestion,
        answers: singleQuestion.answers.filter(
            (a) => a.id !== answerId
        ),
    }

    setSingleQuestion(updatedQuestion)

    if (bulkMode) {
        setMultiQuestion((prev) =>
            prev.map((q) =>
                q.id === updatedQuestion.id
                    ? updatedQuestion
                    : q
            )
        )
    }
}
const handleMarkCorrect = (answerId: string) => {

    const updatedQuestion = {
        ...singleQuestion,
        answers: singleQuestion.answers.map((a) => ({
            ...a,
            isCorrect: a.id === answerId,
        })),
    }

    setSingleQuestion(updatedQuestion)

    if (bulkMode) {
        setMultiQuestion((prev) =>
            prev.map((q) =>
                q.id === updatedQuestion.id
                    ? updatedQuestion
                    : q
            )
        )
    }
}
    const hasCorrectAnswer = singleQuestion.answers.some((a) => a.isCorrect)
    const canAddMore = singleQuestion.answers.length < 4

    const handleSaveQuestions = async () => {
        // SINGLE MODE
       if (!bulkMode) {
            // SINGLE MODE (CREATE OR UPDATE)
            if (singleQuestion.text.trim() === "") {
                toast.error("Please enter question headline")
                return
            }

            if (!hasCorrectAnswer) {
                toast.error("Please select a correct answer")
                return
            }

            if (singleQuestion.answers.length < 2) {
                toast.error("Please add more answers")
                return
            }

            // لو مفيش ID → CREATE
            if (singleQuestion.isNew) {
                await createSingleQuestion({
                    values: {
                        text: singleQuestion.text,
                        answers: singleQuestion.answers.map(a => ({
                            text: a.text,
                            isCorrect: a.isCorrect,
                        })),
                    },
                    id,
                })

                console.log("createSingleQuestion .")

                toast.success("Question created successfully")
            } 
            // لو فيه ID → UPDATE
            else {
                await updateSingleQuestion({
                    id: singleQuestion.id,
                    values: {
                        text: singleQuestion.text,
                        answers: singleQuestion.answers.map(a => ({
                            text: a.text,
                            isCorrect: a.isCorrect,
                        })),
                    },
                })

                console.log("updateSingleQuestion")

                toast.success("Question updated successfully")
            }

            return
        }


        // BULK MODE
        try {
            // NEW QUESTIONS
            const newQuestions =
                multiQuestion.filter(
                    (q) => q.isNew
                )

            // EXISTING QUESTIONS
            const existingQuestions =
                multiQuestion.filter(
                    (q) => !q.isNew
                )

            // UPDATED QUESTIONS ONLY
            const updatedQuestions =
                existingQuestions.filter((q) => {

                    const original =
                        originalQuestions.find(
                            (o) => o.id === q.id
                        )

                    if (!original) {
                        return false
                    }

                    return (
                        original.text !== q.text ||

                        JSON.stringify(
                            original.answers
                        ) !==
                        JSON.stringify(
                            q.answers
                        )
                    )
                })

            // =========================
            // SINGLE CREATE
            // =========================

            if (newQuestions.length === 1) {

                await createSingleQuestion({
                    values: {
                        text:
                            newQuestions[0].text,
                        answers:
                            newQuestions[0].answers.map(
                                (a) => ({
                                    text: a.text,
                                    isCorrect:
                                        a.isCorrect,
                                })
                            ),
                    },

                    id,
                })
                toast.success(
                    "Question created successfully"
                )
            }

            // ** BULK CREATE

            if (newQuestions.length > 1) {
                const payloadBulk = newQuestions.map((q) => ({
                    text: q.text,
                    answers:
                        q.answers.map(
                            (a) => ({
                                text: a.text,
                                isCorrect:
                                    a.isCorrect,
                            })
                        ),
                }))
                await createBulkQuestion({
                    values: {
                        questions : payloadBulk
                    },
                    id
                })

                console.log(newQuestions)

                toast.success(
                    "Bulk questions created"
                )
            }

            // UPDATE QUESTIONS
            console.log("UPDATE QUESTIONS" , updatedQuestions)
            if (updatedQuestions.length > 0) {

                await Promise.all(

                    updatedQuestions.map(
                        async (question) => {

                            await updateSingleQuestion({
                                id: question.id,

                                values : {
                                    text: question.text,
                                    answers: question.answers.map((a) => ({
                                        text: a.text,
                                        isCorrect: a.isCorrect,
                                    })),
                                }
                            })

                            console.log(
                                "UPDATED",
                                question
                            )
                        }
                    )
                )

                toast.success(
                    "Questions updated"
                )
            }

        } catch (error) {

            console.log(error)

            toast.error(
                "Something went wrong"
            )
        }



    }




    return (
        <>
            <div className='flex justify-between items-center bg-white'>
                <Button
                    onClick={() => setBulkMode(!bulkMode)}
                    className='px-4 py-2 flex gap-2.5 text-white bg-blue-600 text-sm font-mono h-auto'>
                    <CopyPlus size={18} />
                    Bulk Add Mode
                </Button>
                <div className="flex gap-2.5">
                    <Link href={"/"} className={cn(buttonVariants(), "bg-gray-200 text-black text-sm font-mono")} >
                        <X />
                        Cancel
                    </Link>

                    <Button disabled={isSinglePending} onClick={handleSaveQuestions} type='submit' className='bg-emerald-500 text-white text-sm font-mono'>
                        {isSinglePending ? <>
                            <Loader2 className='size-4 animate-spin' />
                            <SaveIcon />
                            Save
                        </> : <>
                            <SaveIcon />
                            Save
                        </>}
                    </Button>
                </div>
            </div>
            <div className='p-6'>
                <div className=''>
                    <div className="bg-blue-600 text-white px-4">
                        Exam Info
                    </div>
                    <div className='p-4 bg-white space-y-4'>
                        <div className='space-y-2'>
                            <Label >Exams</Label>
                            <ExamsCombobox selectedId={selectExamId} diplomaId={diplomaId} onChange={setSelectExamId} />
                        </div>
                        {!bulkMode && (
                            <div className='space-y-2'>
                                <Label >Question Headline</Label>
                                <Input value={singleQuestion.text} onChange={(e) => setSingleQuestion({ ...singleQuestion, text: e.target.value })} />
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-blue-600 text-white px-4">
                        Questions
                    </div>
                    {bulkMode && <QuestionBulkMode id={id} multiQuestion={multiQuestion} setMultiQuestion={setMultiQuestion} singleQuestion={singleQuestion} setSingleQuestion={setSingleQuestion} setOriginalQuestions={setOriginalQuestions} />}

                    <div className='flex '>
                        <div className='flex-1'>
                            {/* Answers Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between bg-gray-200">
                                    <div className='flex items-center'>
                                        <span className='w-10 h-10 block'></span>
                                        <label className="text-sm font-medium text-gray-700">
                                            Body
                                        </label>
                                    </div>
                                    <Button
                                        onClick={() => setShowNewAnswerInput(true)}
                                        className="bg-green-500 hover:bg-green-600 rounded-none h-10 text-white gap-1"
                                        disabled={!canAddMore}
                                    >
                                        <Plus size={16} /> Add Answer
                                    </Button>
                                </div>

                                {/* Existing Answers */}
                                <div>
                                    <div className="space-y-0 bg-white">
                                        {singleQuestion.answers.map((answer) => (
                                            <div
                                                key={answer.id}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3 flex-1">
                                                    <Button size={"icon-lg"} variant={"destructive"}
                                                        onClick={() => handleRemoveAnswer(answer.id || "")}
                                                        className='w-12.5 h-12.5'>
                                                        <Trash2 size={19} />
                                                    </Button>


                                                    <span className="text-gray-800 px-4 py-2.5">{answer.text}</span>
                                                </div>

                                                <div className="px-4 py-2.5">
                                                    {answer.isCorrect && (
                                                        <span className="text-xs cursor-pointer font-medium text-green-600  p-2.5 py-1.5 flex gap-1.5"
                                                        >
                                                            <CheckCheck size={14} /> Correct Answer
                                                        </span>
                                                    )}
                                                    {!answer.isCorrect && (
                                                        <span className="text-xs cursor-pointer text-black bg-gray-200 p-2.5 py-1.5 flex gap-1.5"
                                                            onClick={() => handleMarkCorrect(answer.id || "")}
                                                        >
                                                            <CheckIcon size={14} />
                                                            Mark Correct
                                                        </span>
                                                    )}

                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* New Answer Input Row */}
                                    {showNewAnswerInput && (
                                        <div className="flex items-center gap-3 bg-green-50 p-4">
                                            <button
                                                onClick={() => {
                                                    setShowNewAnswerInput(false)
                                                    setNewAnswerText('')
                                                }}
                                                className="text-gray-400 hover:text-gray-600 border border-gray-300 flex justify-center items-center rounded-full flex-shrink-0 w-7.5 h-7.5"
                                            >
                                                <X size={20} />
                                            </button>
                                            <Input
                                                placeholder="Enter answer body"
                                                value={newAnswerText}
                                                onChange={(e) => setNewAnswerText(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleAddAnswer()
                                                    }
                                                }}
                                                className="flex-1 border-green-300"
                                                autoFocus
                                            />
                                            <Button
                                                onClick={handleAddAnswer}
                                                disabled={newAnswerText.trim() === ''}
                                                className="bg-green-500 hover:bg-green-600 text-white flex-shrink-0"
                                            >
                                                + Add
                                            </Button>
                                        </div>
                                    )}
                                </div>



                                {/* Add Answer Button - Disabled when 4 answers reached */}
                                {!showNewAnswerInput && !canAddMore && (
                                    <div className="text-sm text-gray-500 text-center py-2">
                                        Maximum of 4 answers reached
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionsInfo