"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IQueItem, IQuestion } from '../types/questions';
import { IExamInfo } from '../../exams/types/exam';
import { Progress } from '@/src/shared/components/ui/progress';
import { TimerCircle } from './timer-component';
import { RadioGroup, RadioGroupItem } from '@/src/shared/components/ui/radio-group';
import { Button } from '@/src/shared/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSubmissions } from '../hooks/use-submissions';
import { Loader2 } from 'lucide-react';
import { IErrorResponse } from '@/src/shared/lib/types/api';

interface IProps {
    questions: IQueItem[];
    examInfo: IExamInfo

}

type FormValues = {
    answers: Record<string, string>; // questionId -> answerId
};

const QuizComponent = ({ questions, examInfo }: IProps) => {

    const total = questions.length;

    const [currentIndex, setCurrentIndex] = useState(0);
    // const [seconds, setSeconds] = useState(examInfo.exam.duration);
    const [seconds, setSeconds] = useState(10);
    const initialSeconds = useRef(seconds);
    const [finished, setFinished] = useState(false);
    const [showResult, setShowResult] = useState(false)

    const startedAt = new Date().toISOString()

    const { mutate, isPending } = useSubmissions()



    useEffect(() => {
        if (finished) return;
        if (seconds <= 0) {
            console.log("finish Time")
            const payload = buildSubmission()
            try {
                mutate(payload)
                setFinished(true)
                setShowResult(true)
            } catch (error) {
                toast.error("DDD")
            }
            return;
        }
        const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [seconds, finished]); // eslint-disable-line



    const currentQuestion = questions[currentIndex];


    const form = useForm<FormValues>({
        defaultValues: {
            answers: {},
        },
    });

    const selectedAnswer = form.watch(
        `answers.${currentQuestion.id}`
    );

    const handleNext = () => {
        if (!selectedAnswer) return;

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            handleSubmitExam();

        }
    };


    const buildSubmission = () => {
        const values = form.getValues();

        return {
            examId: examInfo.exam.id,
            startedAt,
            answers: questions.map((q) => ({
                questionId: q.id,
                answerId: values.answers[q.id] ?? "df5a227a-1e22-43a9-afd7-cb018cb107cc",
            })),
        };
    };


    const handleSubmitExam = async () => {
        const values = form.getValues();

        const unanswered = questions.some(
            (q) => !values.answers[q.id]
        );

        if (unanswered) {
            toast.error("لازم تجاوب كل الأسئلة");
            return;
        }

        const payload = buildSubmission();

        try {
            await mutate(payload)
            setFinished(true)
            setShowResult(true)
        } catch (error) {
            toast.error("DDD")
        }

    };



    const percentage = ((currentIndex + 1) / examInfo.exam.questionsCount) * 100;


    return (
        <div className='p-6 space-y-4 bg-white'>
            <div className="flex items-center gap-6">
                <div className="flex-1 w-full  space-y-1.5">
                    <div className="flex justify-between">
                        <h6 className='text-base font-mono text-[#1F2937]'>{examInfo.exam.diploma.title} - {examInfo.exam.title}</h6>
                        <p className='font-mono text-sm font-semibold text-[#6B7280]'>Question {currentIndex + 1} of <span className='text-blue-600'>{total}</span></p>
                    </div>
                    <Progress value={percentage} />
                </div>
                <div className="border border-gray-200 h-16.25"></div>
                <TimerCircle
                    total={initialSeconds.current}
                    remaining={seconds}
                />
            </div>

            <h2 className="text-xl font-mono font-semibold text-blue-600">
                {currentQuestion.text}
            </h2>

            <RadioGroup
                value={selectedAnswer}
                onValueChange={(value) =>
                    form.setValue(`answers.${currentQuestion.id}`, value)
                }
                className='gap-2.5'
            >
                {currentQuestion.answers.map((answer) => (
                    <div key={answer.id} className="flex items-center gap-2.5 px-4 bg-gray-50 hover:bg-[#F3F4F6] transition-colors">
                        <RadioGroupItem value={answer.id} id={answer.id} />
                        <label className='text-[#1F2937] font-mono flex-1 py-4' htmlFor={answer.id}>{answer.text}</label>
                    </div>
                ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    className='flex-1 bg-gray-200 font-mono text-sm'
                >
                    Previous
                </Button>

                <Button
                    onClick={handleNext}
                    disabled={!selectedAnswer || isPending}
                    className='flex-1 bg-blue-600 font-mono text-sm'
                >
                    {currentIndex === questions.length - 1 ? isPending ? <>
                        <span>Submiting....</span>
                        <Loader2 className='animate-spin transition-all' />
                    </> : "submit" : "Next"}
                </Button>
            </div>




        </div>
    )
}

export default QuizComponent