"use client"

import { useEffect, useMemo, useRef } from "react"
import DiplomaCard from "./diploma-card"
import { IDiploma } from "@/src/shared/lib/types/diploma"
import { useDiplomasInfinite } from "../hooks/hooks"
import InfiniteScroll from "react-infinite-scroll-component"
import { DiplomaListSkeleton } from "./diploma-list-skeleton"

export default function DiplomasList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useDiplomasInfinite()


    const allDiplomas = useMemo(() => data?.pages.flatMap((page) => page.data ?? []) ?? [], [data])






    if (isLoading) return <DiplomaListSkeleton />

    if (isError) {
        return (
            <div className="flex items-center justify-center h-64 text-red-500">
                <p>حصل خطأ، حاول تاني</p>
            </div>
        )
    }

    return (
        <div className="">


            {/* Grid */}

            <InfiniteScroll
                dataLength={allDiplomas.length} //This is important field to render the next data
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<DiplomaListSkeleton />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                    {allDiplomas.map((diploma, index) => (
                        <DiplomaCard key={diploma.id} diploma={diploma} index={index} />
                    ))}
                </div>
            </InfiniteScroll>




        </div>
    )
}

