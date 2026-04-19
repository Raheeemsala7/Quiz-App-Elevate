"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IQueItem, IQuestion } from '../types/questions';
import { IExamInfo } from '../../exams/types/exam';
import { Progress } from '@/src/shared/components/ui/progress';
import { TimerCircle } from './timer-component';
import { RadioGroup, RadioGroupItem } from '@/src/shared/components/ui/radio-group';
import { Button } from '@/src/shared/components/ui/button';
import { useForm } from 'react-hook-form';

interface IProps {
    questions: IQueItem[];
    examInfo: IExamInfo

}

type FormValues = {
    answers: Record<string, string>; // questionId -> answerId
};

const QuizComponent = ({ questions, examInfo }: IProps) => {

    const total = questions.length;
    const startedAtRef = useRef<string>(new Date().toISOString()); // captured once on mount

    const [currentIndex, setCurrentIndex] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // questionId -> answerId
    const [seconds, setSeconds] = useState(examInfo.exam.duration);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [finished, setFinished] = useState(false);


    useEffect(() => {
        if (finished) return;
        if (seconds <= 0) {
            // time's up → force submit with whatever answers we have
            // submitExam(selectedAnswers);
            return;
        }
        const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [seconds, finished]); // eslint-disable-line


    console.log(questions)


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
            console.log("Submit:", form.getValues());
        }
    };

    console.log(questions)

    const percentage = (currentIndex / examInfo.exam.questionsCount) * 100;


    return (
        <div>
            <div className="flex items-center">
                <div className="flex-1 w-full">
                    <div className="flex justify-between">
                        <h6>{examInfo.exam.title}</h6>
                        <p>Question {currentIndex} of <span className='text-blue-600'>{examInfo.exam.questionsCount}</span></p>
                    </div>

                    <Progress value={percentage} />

                </div>
                <TimerCircle totalSeconds={seconds} />
            </div>


            <h2 className="text-xl font-semibold">
                {currentIndex + 1}. {currentQuestion.text}
            </h2>

            <RadioGroup
                value={selectedAnswer}
                onValueChange={(value) =>
                    form.setValue(`answers.${currentQuestion.id}`, value)
                }
            >
                {currentQuestion.answers.map((answer) => (
                    <div key={answer.id} className="flex items-center gap-2">
                        <RadioGroupItem value={answer.id} id={answer.id} />
                        <label htmlFor={answer.id}>{answer.text}</label>
                    </div>
                ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                >
                    Previous
                </Button>

                <Button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                >
                    {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                </Button>
            </div>
        </div>
    )
}

export default QuizComponent