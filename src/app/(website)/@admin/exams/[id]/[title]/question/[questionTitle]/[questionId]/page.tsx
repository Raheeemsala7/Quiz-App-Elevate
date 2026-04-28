import { getQuestionApi } from '@/src/features/questions/apis/question.api'
import { Button, buttonVariants } from '@/src/shared/components/ui/button'
import { cn } from '@/src/shared/lib/utils'
import { Ban, ExternalLink, PenLine, Trash2 } from 'lucide-react'
import Link from 'next/link'
import slugify from 'slugify'


const page = async ({ params }: {
    params: Promise<{
        id: string;
        title: string;
        questionTitle: string
        questionId: string;
    }>
}) => {

    const { questionTitle, questionId, title, id } = await params

    console.log(id, title, questionId, questionTitle)

    const questionInfo = await getQuestionApi(questionId)



    return (
        <>
            <div className='flex items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200'>
                <div>
                    <h5 className='text-lg font-semibold'>{questionTitle.split("-").join(" ")}</h5>
                    <p className='text-gray-400 text-sm flex'>Exam : {"   "} <Link className='underline text-gray-400 flex items-center gap-1' href={`/exams/${id}/${title}`}> {title} <ExternalLink size={14} /></Link></p>
                </div>
                <div className="flex items-center gap-4">
                    <Button className='font-mono bg-gray-200 text-black p-4 gap-2.5'>
                        <Ban />
                        Immutable
                    </Button>
                    <Link className={cn(buttonVariants(), "font-mono p-4 gap-2.5 bg-blue-600")}
                        href={`/exams/${id}/${slugify(title, { lower: false })}/question/${slugify(questionId[1], { lower: false })}/${questionId[0]}`}

                    >
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


                    <div className="mt-4">
                        <p className='text-gray-400 mb-1 font-mono'>Headline</p>
                        <h6 className='font-mono'>{questionInfo.question.text}</h6>
                    </div>
                    <div className="mt-4">
                        <p className='text-gray-400 mb-1 font-mono'>Exam</p>
                        <p className='font-mono'>{questionInfo.question.exam.title}</p>
                    </div>
                    <div className="mt-4">
                        <p className='text-gray-400 mb-1 font-mono'>Answer</p>
                        <p className='font-mono'>{questionInfo.question.answers.length}</p>
                    </div>

                </div>


            </div>
        </>
    )
}

export default page