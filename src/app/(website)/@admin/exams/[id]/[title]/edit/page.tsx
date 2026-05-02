import FormExam from '@/src/features/exams/_components/form-exam';
import { getExamById } from '@/src/features/exams/apis/exams.api';
import MenubarSortQuestion from '@/src/features/questions/_components/menubar-sort-questions';
import QuestionsList from '@/src/features/questions/_components/questions-list';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react'

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
    <>
      <FormExam initialData={exam} isEdit={true} id={id} />
      <div className="mt-4 p-4">
        <div className='flex justify-between items-center bg-blue-600 p-2.5'>
          <p className='text-white'>Exam Questions</p>
          <Link href={`/exams/${id}/create-add-question`} className='text-white font-mono flex items-center gap-2 text-base'>
            <Plus />
            Add Questions
          </Link>
        </div>
        <div className='flex justify-between items-center bg-gray-200 p-4'>
          <p className='text-black'>Title</p>
          <MenubarSortQuestion />
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <QuestionsList id={id} title={title} searchParams={sp} />
        </Suspense>
      </div>
    </>
  )
}

export default page