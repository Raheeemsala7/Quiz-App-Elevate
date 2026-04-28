"use client";

import Image from 'next/image';
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowDown10,
  ArrowUp10,
  CalendarArrowDown,
  CalendarArrowUp,
  ArrowDownWideNarrow,
  Ellipsis,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/src/shared/components/ui/menubar';
import { useRouter, useSearchParams } from "next/navigation";
import slugify from "slugify";
import { IDiploma } from '../../diploma/types/diploma';
import { IExam } from '../types/exam';
import SkeletonTable from '@/src/shared/components/shared/skeleton-tabel';


interface IProps {
  exams: IExam[];
  isPending: boolean;
  isFetching: boolean;
  isLoading: boolean;
}


const ExamsTable = ({ exams, isFetching, isLoading, isPending }: IProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();


  const setSort = (sortBy: string, sortOrder: string) => {
    const params = new URLSearchParams(searchParams.toString());

    console.log("clicked!!!!!!!!!!!!!")

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1"); // مهم

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-nowrap">No. of Questions</th>
              <th className="px-4 py-3 text-center text-sm font-semibold flex justify-center">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="flex items-center border-none rounded-none w-fit hover:bg-transparent">
                      Sort
                      <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
                    </MenubarTrigger>

                    <MenubarContent>
                      <MenubarGroup>

                        <MenubarItem
                          onClick={() => setSort("title", "asc")}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowUpAZ className="h-4 w-4" />
                          Title (descending)
                        </MenubarItem>

                        <MenubarItem
                          onClick={() => setSort("title", "desc")}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowDownAZ className="h-4 w-4" />
                          Title (ascending)
                        </MenubarItem>

                        <MenubarItem
                          onClick={() => setSort("questions", "desc")}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowDown10 className="h-4 w-4" />
                          Questions No. (descending)
                        </MenubarItem>

                        <MenubarItem
                          onClick={() => setSort("questions", "asc")}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowUp10 className="h-4 w-4" />
                          Questions No. (ascending)
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => setSort("createdAt", "desc")}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <CalendarArrowDown className="h-4 w-4" />
                          Newest (descending)

                        </MenubarItem>

                        <MenubarItem
                          onClick={() => setSort("createdAt", "asc")}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <CalendarArrowUp className="h-4 w-4" />
                          Newest (ascending)

                        </MenubarItem>

                      </MenubarGroup>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </th>
            </tr>
          </thead>
          <tbody>
            {isFetching && isLoading && isPending &&
              <SkeletonTable />
            }

            {exams.length ? exams?.map((exam, index) => (
              <tr
                key={exam.id}
                className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src={exam.image}
                      alt={exam.title}
                      fill
                      className="rounded-md object-cover"
                      crossOrigin="anonymous"
                    />

                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {exam.title}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {exam.description}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {exam.questionsCount}
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
                          <MenubarItem className="flex items-center gap-2" onClick={() => router.push(`/exams/${exam.id}/${slugify(exam.title, { lower: false })}`)}>
                            <Eye className="h-4 w-4 text-green-500" />
                            View
                          </MenubarItem>

                          <MenubarItem className="flex items-center gap-2">
                            <Pencil className="h-4 w-4 text-blue-500" />
                            Edit
                          </MenubarItem>

                          <MenubarItem className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4 text-red-500" />
                            Delete
                          </MenubarItem>
                        </MenubarGroup>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </td>
              </tr>
            )) : <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No diplomas found. Try adjusting your filters.</p>
            </div>}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExamsTable