// components/diplomas/DiplomasGrid.tsx
"use client"

import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useDiplomasInfinite } from "@/src/shared/lib/features/diplomas/hooks"
import DiplomaCard from "./diploma-card"
import { IDiploma } from "@/src/shared/lib/types/diploma"

export default function DiplomasGrid() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useDiplomasInfinite()

    const { ref, inView } = useInView({ threshold: 0.1 })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            console.log("fetchNextPage" , new Date().getTime())
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    const allDiplomas = data?.pages.flatMap((page) => {
        if (!("payload" in page)) return []  
        return page.payload.data ?? []
    }) ?? []




    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                {allDiplomas.map((diploma, index) => (
                    <DiplomaCard key={diploma.id} diploma={diploma} index={index} />
                ))}
            </div>

            {/* Infinite scroll trigger + loader */}
            <div ref={ref} className="flex items-center justify-center py-6">
                {isFetchingNextPage ? (
                    <div className="w-7 h-7 border-[3px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                ) : hasNextPage ? (
                    <div className="flex flex-col items-center gap-2 text-white/40 text-xs">
                        <span>Scroll to view more</span>
                        <div className="w-4 h-4 border-r-2 border-b-2 border-white/30 rotate-45 animate-bounce" />
                    </div>
                ) : (
                    <p className="text-white/30 text-xs">All diplomas loaded</p>
                )}
            </div>
        </div>
    )
}

