import { getExamById } from '@/src/features/exams/apis/exams.api';
import { Button, buttonVariants } from '@/src/shared/components/ui/button';
import { cn } from '@/src/shared/lib/utils';
import { Ban, PenLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify'

interface IProps {
  params: Promise<{
    id: string;
    title: string;
  }>
}

const page = async ({ params }: IProps) => {

  let { id, title } = await params

  const data = await getExamById(id)



  const exam = data.exam



  return (
    <>
      <div className='flex items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200'>
        <h5 className='text-lg font-semibold'>{title.split("-").join(" ")}</h5>
        <div className="flex items-center gap-4">
          <Button className='font-mono bg-gray-200 text-black p-4 gap-2.5'>
            <Ban />
            Immutable
          </Button>
          <Link className={cn(buttonVariants() , "font-mono p-4 gap-2.5 bg-blue-600")} href={`/${exam.id}/${slugify(exam.title, { lower: false })}/edit`}>
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
      </div>
    </>
  )
}

export default page