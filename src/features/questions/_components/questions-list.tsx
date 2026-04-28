import slugify from 'slugify'
import { getQuestions } from '../apis/question.api'
import Link from 'next/link'
import { ArrowDownAZ, ArrowDownWideNarrow, ArrowUpAZ, CalendarArrowDown, CalendarArrowUp, Ellipsis, Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from '@/src/shared/components/ui/menubar'
import MenubarSortQuestion from './menubar-sort-questions'

interface IProps {
    id: string
    title: string;
    searchParams?: {
        search?: string;
        sortBy?: "title" | "createdAt";
        sortOrder?: "asc" | "desc";
    };
}

const QuestionsList = async ({ id, title, searchParams }: IProps) => {

    const questions = await getQuestions(id, {
        search: searchParams?.search,
        sortBy: searchParams?.sortBy,
        sortOrder: searchParams?.sortOrder,
    })


    console.log({
         search: searchParams?.search,
        sortBy: searchParams?.sortBy,
        sortOrder: searchParams?.sortOrder,
    })



    return (
            
            <div>
                {questions.questions.map((que) => (
                    <div className='bg-white px-4 py-2.5 flex justify-between' key={que.id}>
                        <p className='text-sm flex-1'>{que.text}</p>

                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger className="h-7.5 w-7.5 flex justify-center items-center px-0 border-none bg-gray-200 rounded-none">
                                    <Ellipsis />
                                </MenubarTrigger>

                                <MenubarContent>
                                    <MenubarGroup>

                                        {/* ✅ View */}
                                        <MenubarItem asChild>
                                            <Link
                                                href={`/exams/${id}/${slugify(title, { lower: false })}`}
                                                className="flex items-center gap-2"
                                            >
                                                <Eye className="h-4 w-4 text-green-500" />
                                                View
                                            </Link>
                                        </MenubarItem>

                                        {/* Edit */}
                                        <MenubarItem asChild>
                                            <Link
                                                href={`/exams/${id}/edit`}
                                                className="flex items-center gap-2"
                                            >
                                                <Pencil className="h-4 w-4 text-blue-500" />
                                                Edit
                                            </Link>
                                        </MenubarItem>

                                        {/* Delete (هنظبطه تحت) */}
                                        <MenubarItem className="flex items-center gap-2">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                            Delete
                                        </MenubarItem>

                                    </MenubarGroup>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                ))}
            </div>
    )
}

export default QuestionsList