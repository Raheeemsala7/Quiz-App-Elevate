"use client"
import { ArrowDownAZ, ArrowDownWideNarrow, ArrowUpAZ, CalendarArrowDown, CalendarArrowUp, Ellipsis, Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from '@/src/shared/components/ui/menubar'
import { useRouter, useSearchParams } from 'next/navigation';

const MenubarSortQuestion = () => {
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
    )
}

export default MenubarSortQuestion