'use client';

import { useEffect, useState } from 'react';

import { ChevronsDownUp, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/src/shared/components/ui/input';
import { Checkbox } from 'radix-ui';
import { Button } from '@/src/shared/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select';
import { useDiplomasFilter } from '../../diploma/hooks/hooks';

interface IProps {
    diplomas: {
        id: string;
        title: string
    }[]
}


export function SearchFilters() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDiploma, setSelectedDiploma] = useState("");

    const { data: diplomas } = useDiplomasFilter()





    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        // search
        if (searchQuery.trim()) {
            params.set("search", searchQuery.trim());
        } else {
            params.delete("search");
        }

        // diploma filter
        if (selectedDiploma) {
            params.set("diplomaId", selectedDiploma);
        } else {
            params.delete("diplomaId");
        }

        // reset page
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };


    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("search");
        params.delete("diplomaId");
        params.set("page", "1");

        setSearchQuery("");
        setSelectedDiploma("");

        router.push(`?${params.toString()}`);
    };

    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
        setSelectedDiploma(searchParams.get("diplomaId") || "");
    }, []);


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

                    <div className='flex items-center gap-4'>
                        <Select value={selectedDiploma} onValueChange={setSelectedDiploma}>
                            <SelectTrigger className="w-full flex-1">
                                <SelectValue placeholder="Diploma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {diplomas?.map((diploma) => (
                                        <SelectItem value={diploma.id}>{diploma.title}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
                            disabled={!searchQuery && !selectedDiploma}
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
