"use client"
import { Button, buttonVariants } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/input'
import { Label } from '@/src/shared/components/ui/label'
import { cn } from '@/src/shared/lib/utils'
import { CheckCheck, CheckIcon, CopyPlus, Loader2, Plus, SaveIcon, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Answer, ExamQuestion } from '../types/questions'
import { ExamsCombobox } from './ExamsCombobox'
import { useCreateSingleQuestion } from '../hooks/use-question'
import { toast } from 'sonner'


const QuestionsInfo = ({ id, diplomaId }: { id: string, diplomaId: string }) => {

    
    
    
    const [bulkMode, setBulkMode] = useState(false)
    const [question, setQuestion] = useState<ExamQuestion>({
        text: '',
        answers: [],
    })
    const [newAnswerText, setNewAnswerText] = useState('')
    const [showNewAnswerInput, setShowNewAnswerInput] = useState(false)
    const [selectExamId, setSelectExamId] = useState<string>(id || "");
    const { mutateAsync: createSingleQuestion, isPending } = useCreateSingleQuestion()
    

    const handleAddAnswer = () => {
        if (newAnswerText.trim() === '') return
        const newAnswer: Answer = {
            id: Date.now().toString(),
            text: newAnswerText,
            isCorrect: false,
        }

        setQuestion({
            ...question,
            answers: [...question.answers, newAnswer],
        })

        setNewAnswerText('')
        setShowNewAnswerInput(false)
    }

    const handleRemoveAnswer = (id: string) => {
        setQuestion({
            ...question,
            answers: question.answers.filter((a) => a.id !== id),
        })
    }

    const handleMarkCorrect = (id: string) => {
        setQuestion({
            ...question,
            answers: question.answers.map((a) => ({
                ...a,
                isCorrect: a.id === id,
            })),
        })
    }

    const hasCorrectAnswer = question.answers.some((a) => a.isCorrect)
    const canAddMore = question.answers.length < 4

    const handleCreateSingleQuestion = async () => {

        if (question.text.trim() === '') {
            toast.error('Please enter question headline')
            return
        }
        if (!hasCorrectAnswer) {
            toast.error('Please select a correct answer')
            return
        }
        if (question.answers.length  <= 1) {
            toast.error('Please add more answers')
            return
        }

        await createSingleQuestion({ values: {
            text: question.text,
            answers: question.answers.map((a) => ({
                text: a.text,
                isCorrect: a.isCorrect,
            })),
        }, id })

        toast.success('Question created successfully')
        setQuestion({
            text: '',
            answers: [],
        })
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

                    <Button disabled={isPending} onClick={handleCreateSingleQuestion} type='submit' className='bg-emerald-500 text-white text-sm font-mono'>
                        {isPending ? <>
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
                                <Input value={question.text} onChange={(e) => setQuestion({ ...question, text: e.target.value })} />
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-blue-600 text-white px-4">
                        Questions
                    </div>

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
                                        {question.answers.map((answer) => (
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