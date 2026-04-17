"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IQuestion } from '../types/questions';
import { IExamInfo } from '../../exams/types/exam';

interface IProps {
    questions: IQuestion[];
    examInfo: IExamInfo

}

const QuizComponent = ({ questions, examInfo }: IProps) => {

    const total = questions.length;
    const startedAtRef = useRef<string>(new Date().toISOString()); // captured once on mount

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // questionId -> answerId
    const [seconds, setSeconds] = useState(300);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [finished, setFinished] = useState(false);

    const currentQuestion = questions[currentIndex];

    const percentage = (currentIndex / examInfo.exam._count.questions) * 100;


    return (
        <div>
            <div className="flex items-center">
                <div className="flex-1 w-full">
                    <div className="flex justify-between">
                        <h6>{examInfo.exam.title}jojkljkj</h6>
                        <p>Question {currentIndex} of <span className='text-blue-600'>{examInfo.exam._count.questions}</span></p>
                    </div>

                    <Progress value={percentage} id="progress-upload" className="rtl:rotate-180" />

                </div>
            </div>
        </div>
    )
}

export default QuizComponent