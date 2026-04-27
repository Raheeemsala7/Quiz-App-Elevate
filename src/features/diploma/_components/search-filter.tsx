'use client';

import { useState } from 'react';

import { ChevronUp, X } from 'lucide-react';
import { Input } from '@/src/shared/components/ui/input';
import { Checkbox } from 'radix-ui';
import { Button } from '@/src/shared/components/ui/button';

interface SearchFiltersProps {

}

export function SearchFilters() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleApplyFilters = () => {

    };

    const handleClearFilters = () => {
        setSearchQuery('');
    };


    return (
        <div className="bg-white border border-gray-200 rounded-lg mb-4">
            <div className="flex items-center justify-between px-4 py-3 bg-blue-700 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white rounded"></div>
                    <span className="font-semibold text-sm">Search & Filters</span>
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                    <ChevronUp
                        size={16}
                        className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                    />
                    <span className="text-xs">Hide</span>
                </button>
            </div>

            {!isCollapsed && (
                <div className="px-4 py-4 space-y-4 border-t">
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">Search by title</label>
                        <Input
                            type="text"
                            placeholder="Search by title"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-100 border-gray-300"
                        />
                    </div>

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

                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearFilters}
                            className="flex-1 text-gray-700"
                        >
                            Clear
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleApplyFilters}
                            disabled={!searchQuery}
                            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
