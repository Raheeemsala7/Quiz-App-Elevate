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

export function PaginationDiplomas({ currentPage, totalItems, totalPages ,limit }: IProps) {

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
        <div className="flex items-center justify-between mt-4 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{startItem}</span> - <span className="font-semibold text-gray-800">{endItem}</span> of {' '}
                <span className="font-semibold text-gray-800">{totalItems}</span>
            </div>

            <div className="text-sm text-gray-600">
                Page <span className="font-semibold text-gray-800">{currentPage}</span> of{' '}
                <span className="font-semibold text-gray-800">{totalPages}</span>
            </div>

            <div className="flex gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2"
                >
                    <ChevronLeft size={16} />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2"
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
}
