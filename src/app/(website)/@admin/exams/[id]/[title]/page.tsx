import { getExamById } from '@/src/features/exams/apis/exams.api';
import { IExamInfo } from '@/src/features/exams/types/exam';
import MenubarSortQuestion from '@/src/features/questions/_components/menubar-sort-questions';
import QuestionsList from '@/src/features/questions/_components/questions-list';
import { Button, buttonVariants } from '@/src/shared/components/ui/button';
import { cn } from '@/src/shared/lib/utils';
import { Ban, PenLine, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import slugify from 'slugify'



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

  console.log(data)

  if (!data.status) {
  return (
    <div className="p-6">
      <h2>Exam not found</h2>
    </div>
  )
}

  const exam = data.payload.exam



  return (
    <>
      <div className='flex items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200'>
        <h5 className='text-lg font-semibold'>{title.split("-").join(" ")}</h5>
        <div className="flex items-center gap-4">
          <Button className='font-mono bg-gray-200 text-black p-4 gap-2.5'>
            <Ban />
            Immutable
          </Button>
          <Link className={cn(buttonVariants(), "font-mono p-4 gap-2.5 bg-blue-600")} href={`/${exam.id}/${slugify(exam.title, { lower: false })}/edit`}>
            <PenLine />
            Edit
          </Link>
          <Button className='font-mono p-4 gap-2.5' variant={"destructive"}>
            <Trash2 />
            Delete
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white p-4">
          <p className='text-gray-400 mb-4 font-mono'>Image</p>
          <div className='w-75 h-75 relative'>
            <Image src={exam.image} className='object-cover' fill alt={exam.title} />
          </div>

          <div className="mt-4">
            <p className='text-gray-400 mb-1 font-mono'>Title</p>
            <h6 className='font-mono'>{exam.title}</h6>
          </div>
          <div className="mt-4">
            <p className='text-gray-400 mb-1 font-mono'>Description</p>
            <p className='font-mono'>{exam.description}</p>
          </div>
          <div className="mt-4">
            <p className='text-gray-400 mb-1 font-mono'>Diploma</p>
            <p className='font-mono'>{exam.diploma.title}</p>
          </div>
          <div className="mt-4">
            <p className='text-gray-400 mb-1 font-mono'>Duration</p>
            <p className='font-mono'>{exam.duration}</p>
          </div>
          <div className="mt-4">
            <p className='text-gray-400 mb-1 font-mono'>No. of Questions</p>
            <p className='font-mono'>{exam.questionsCount}</p>
          </div>
        </div>

        <div className="mt-4">
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
      </div>
    </>
  )
}

export default page