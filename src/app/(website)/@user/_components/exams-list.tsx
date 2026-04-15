import { IExam } from '@/src/shared/lib/types/exam'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'


const ExamsList = async ({ examsData }: { id: string, examsData: IExam[] }) => {





    return (
        <div className="space-y-4 mt-8">
            {examsData.map((exam) => (
                <div key={exam.id} className="relative bg-[#EFF6FF] border border-gray-200 shadow-sm p-4 w-full  
            flex items-center gap-4 group hover:shadow-md transition">

                    <div className="relative flex justify-center items-center size-25 bg-[#DBEAFE] border border-[#8EC5FF]">
                        <Image
                            src={`https://exam-app.elevate-bootcamp.cloud${exam.image}`}
                            width={75}
                            height={75}
                            className="object-fill h-19"
                            alt={exam.title}
                        // sizes="(max-width: 768px) 33vw, 75px"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <h2 className="text-xl font-semibold text-blue-600 font-mono">{exam.title}</h2>
                            <div className="flex items-center gap-4 text-gray-400 text-sm">
                                <span>⏱ {exam.duration} minutes</span>
                                {/* <span>❓ {exam.} Questions</span> */}
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-3 font-mono">
                            {exam.description}
                        </p>
                    </div>

                    <div className="absolute bottom-4 right-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1  shadow">
                            <span>START </span>
                            <MoveRight className="size-5 text-white" />
                        </button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default ExamsList