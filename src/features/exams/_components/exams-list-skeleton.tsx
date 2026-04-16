import { Skeleton } from '@/src/shared/components/ui/skeleton'

const ExamsListSkeleton = () => {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative bg-[#EFF6FF] border border-gray-200 shadow-sm p-4 w-full flex items-center gap-4">

                    {/* Image */}
                    <div className="flex justify-center items-center size-25 bg-[#DBEAFE] border border-[#8EC5FF]">
                        <Skeleton className="h-19 w-19 bg-gray-400/70" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                            <Skeleton className="h-6 w-1/2 bg-gray-400/70" />
                            <Skeleton className="h-4 w-24 bg-gray-300" />
                        </div>

                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-5/6 bg-gray-300" />
                    </div>

                    {/* Button Skeleton */}
                    <div className="absolute bottom-4 right-2">
                        <Skeleton className="h-8 w-20 bg-gray-400/70" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExamsListSkeleton