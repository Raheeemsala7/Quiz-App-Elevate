"use client";

import Image from 'next/image';
import { ArrowUpDown, Ellipsis } from 'lucide-react';
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/src/shared/components/ui/menubar';
import { IDiploma } from '../types/diploma';

const DiplomaTable = ({ diplomas }: { diplomas: IDiploma[] }) => {



  if (diplomas?.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No diplomas found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                <button
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  Sort
                  <ArrowUpDown size={14} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {diplomas?.map((diploma, index) => (
              <tr
                key={diploma.id}
                className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src={diploma.image}
                      alt={diploma.title}
                      fill
                      className="rounded-md object-cover"
                      crossOrigin="anonymous"
                    />

                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {diploma.title}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {diploma.description}
                  </p>
                </td>

                <td className="px-4 py-3 flex justify-center items-center">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger className='h-7.5 w-7.5 flex justify-center items-center px-0 border-none bg-gray-200 rounded-none'>
                        <Ellipsis />
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarGroup>
                          <MenubarItem>
                            New Tab
                          </MenubarItem>
                          <MenubarItem>New Window</MenubarItem>
                        </MenubarGroup>
                        <MenubarSeparator />
                        <MenubarGroup>
                          <MenubarItem>Share</MenubarItem>
                          <MenubarItem>Print</MenubarItem>
                        </MenubarGroup>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiplomaTable