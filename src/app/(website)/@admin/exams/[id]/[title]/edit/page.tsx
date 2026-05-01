import FormExam from '@/src/features/exams/_components/form-exam';
import { getExamById } from '@/src/features/exams/apis/exams.api';
import React from 'react'

interface IProps {
  params: Promise<{
    id: string;
    title: string;
  }>;
  searchParams: {
    search?: string;
    sortBy?: "title" | "createdAt";
    sortOrder?: "asc" | "desc";
  };
}

const page = async ({ params, searchParams }: IProps) => {

  let { id, title } = await params

  const data = await getExamById(id)

  const sp = await searchParams


  if (!data || !data.status) {
    return (
      <div className="p-6">
        <h2>Exam not found</h2>
      </div>
    )
  }

  const exam = data.payload.exam
  return (
    <FormExam initialData={exam} isEdit={true} id={id} />
  )
}

export default page