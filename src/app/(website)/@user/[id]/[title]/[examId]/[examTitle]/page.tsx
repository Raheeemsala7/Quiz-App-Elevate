import { getExamById } from '@/src/features/exams/apis/exams.api'
import QuizComponent from '@/src/features/questions/_components/quiz-component'
import { getQuestionsApi } from '@/src/features/questions/apis/question.api'
import React from 'react'

interface IProps {
  params: Promise<{
    examId: string
    examTitle: string
  }>
}


const page = async ({ params }: IProps) => {

  const { examId, examTitle } = await params

  const examInfo = await getExamById(examId)
  const questionsPayload = await getQuestionsApi(examId)



  return (
    <QuizComponent examInfo={examInfo} questions={questionsPayload.questions} />
  )
}

export default page