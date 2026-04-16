"use client"
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import { useExamsInfinite } from '../hooks/hooks'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useMemo } from 'react'
import ExamsListSkeleton from './exams-list-skeleton'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'


const ExamsList = ({ id }: { id: string }) => {

    const pathName = usePathname()

    console.log(pathName)

    const { data, isLoading, isError, fetchNextPage, hasNextPage } = useExamsInfinite(id)

    console.log(data)
    const allExamsData = useMemo(() => data?.pages.flatMap((page) => page.data ?? []) ?? [], [data])

    if (isLoading) {
        return <ExamsListSkeleton />
    }

    if (isError) {
        return <p>Error...</p>
    }






    return (

        <InfiniteScroll
            dataLength={allExamsData.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<ExamsListSkeleton />}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="space-y-4 mt-8">
                {allExamsData.map((exam) => (
                    <div key={exam.id} className="relative bg-[#EFF6FF] border border-gray-200 shadow-sm p-4 w-full  
            flex items-center gap-4 group hover:shadow-md transition">

                        <div className="relative flex justify-center items-center size-25 bg-[#DBEAFE] border border-[#8EC5FF]">
                            <Image
                                src={`https://exam-app.elevate-bootcamp.cloud${exam.image}`}
                                width={75}
                                height={75}
                                className="object-fill h-19"
                                alt={exam.title}
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
                            <Link href={`${pathName}/${exam.id}/${exam.title}`}  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1  shadow">
                                <span>START </span>
                                <MoveRight className="size-5 text-white" />
                            </Link >
                        </div>

                    </div>
                ))}
            </div>

        </InfiniteScroll>

    )
}

export default ExamsList

