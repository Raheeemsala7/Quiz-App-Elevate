'use client';

import { Button } from '@/src/shared/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

type IProps = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;

};

export function PaginationDiplomas({ currentPage, totalItems, totalPages, limit }: IProps) {

    const searchParams = useSearchParams()
    const router = useRouter()
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;

    const endItem = Math.min(currentPage * limit, totalItems);

    const onPageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", String(page));

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-start gap-4 px-4 py-3 bg-white border border-gray-200">
            <div className="text-sm text-gray-800 font-mono">
                <span className="font-semibold text-gray-800">{startItem}</span> - <span className="font-semibold text-gray-800">{endItem}</span> of {' '}
                <span className="font-semibold text-gray-800">{totalItems}</span>
            </div>



            <div className="flex gap-3 items-center border border-gray-200">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 bg-gray-200 rounded-none size-10"
                >
                    <ChevronLeft size={18} />
                </Button>
                <div className="text-sm text-gray-400 ">
                    Page <span>{currentPage}</span> of{' '}
                    <span>{totalPages}</span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 bg-gray-200 rounded-none size-10"
                >
                    <ChevronRight size={18} />
                </Button>
            </div>
        </div>
    );
}
