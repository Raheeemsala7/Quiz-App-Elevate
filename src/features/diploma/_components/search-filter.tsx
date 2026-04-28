'use client';

import { useState } from 'react';

import { ChevronsDownUp, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/src/shared/components/ui/input';
import { Checkbox } from 'radix-ui';
import { Button } from '@/src/shared/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';



export function SearchFilters() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (searchQuery.trim()) {
            params.set("search", searchQuery.trim());
        } else {
            params.delete("search");
        }

        // reset page
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };


    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("search");
        params.set("page", "1");

        setSearchQuery("");

        router.push(`?${params.toString()}`);
    };


    return (
        <div className="bg-white border border-gray-200  mb-4">
            <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white ">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className='size-5' />
                    <span className="font-semibold text-base">Search & Filters</span>
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                    <ChevronsDownUp
                        size={14}
                        className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                    />
                    <span className="text-xs">Hide</span>
                </button>
            </div>

            {!isCollapsed && (
                <div className="px-4 py-4 space-y-4 border-t">
                    <Input
                        type="text"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className=" border-gray-200 p-2.5 h-11.5"
                    />

                    <div>
                        <label className="block text-sm text-gray-700 mb-3">Immutability</label>
                        {/* <div className="flex items-center gap-2">
                            <Checkbox
                                id="immutability"
                            // checked={immutabilityFilter}
                            // onCheckedChange={onImmutabilityChange}
                            />
                            <label htmlFor="immutability" className="text-sm text-gray-600 cursor-pointer">
                                Show immutable courses
                            </label>
                        </div> */}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearFilters}
                            className='h-9 w-25 px-3 rounded-none border-none'
                        >
                            Clear
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleApplyFilters}
                            disabled={!searchQuery}
                            className=" bg-gray-200 hover:bg-gray-300 transition-colors text-gray-800 h-9 w-25 px-3 rounded-none"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
