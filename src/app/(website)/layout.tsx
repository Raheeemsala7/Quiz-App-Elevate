
import { authOptions } from '@/src/auth'
import Breadcrumb from '@/src/shared/components/breadcrumb'
import LogoApp from '@/src/shared/components/icons/Logo'
import SignOutButton from '@/src/shared/components/signOutButton'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/src/shared/components/ui/dropdown-menu'
import { cn } from '@/src/shared/lib/utils'
import { Bolt, BookOpenCheck, EllipsisIcon, GraduationCap, UserRound } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

interface IProps {
    children: React.ReactNode
    admin: React.ReactNode
    user: React.ReactNode
}

const layoutDashboard = async ({ children, admin, user }: IProps) => {


    const userData = await getServerSession(authOptions)
    const isAdmin = userData?.user.role === "ADMIN" ? true : false





    return (
        <div className='grid grid-cols-[362px_1fr] relative'>
            <aside className={cn(
                isAdmin ? "bg-gray-800" : "bg-blue-50",
                "h-screen p-10 sticky top-0 left-0 flex gap-15 flex-col"
            )}>
                <Link href={"/"} >
                    <LogoApp />
                </Link>

                <div className="flex flex-col justify-between items-baseline flex-1">
                    <div className='space-y-2 w-full'>
                        <Link href={"/"} className={cn("flex p-4 gap-2.5 group  transition-all",
                            isAdmin ? "hover:bg-gray-700 border border-transparent hover:border-gray-400 text-white" : "hover:bg-blue-100 border border-transparent hover:border-blue-600 hover:text-blue-600"
                        )}>
                            <GraduationCap className='size-6 text-inherit group-hover:text-inherit transition-colors' />
                            <span className='text-inherit group-hover:text-inherit font-mono text-base transition-colors'>Diploma</span>
                        </Link>
                        {isAdmin && (
                        <Link href={"/exams"} className={cn("flex p-4 gap-2.5 group  transition-all",
                            isAdmin ? "hover:bg-gray-700 border border-transparent hover:border-gray-400 text-white" : "hover:bg-blue-100 border border-transparent hover:border-blue-600 hover:text-blue-600"
                        )}>
                            <BookOpenCheck className='size-6 text-inherit group-hover:text-inherit transition-colors' />
                            <span className='text-inherit group-hover:text-inherit font-mono text-base transition-colors'>Exams</span>
                        </Link>
                        )}
                        <Link href={"/account"} className={cn("flex p-4 gap-2.5 group  transition-all",
                            isAdmin ? "hover:bg-gray-700 border border-transparent hover:border-gray-400 text-white" : "hover:bg-blue-100 border border-transparent hover:border-blue-600 hover:text-blue-600"
                        )}>
                            <UserRound className='size-6 text-inherit group-hover:text-inherit transition-colors' />
                            <span className='text-inherit group-hover:text-inherit font-mono text-base transition-colors'>Account</span>
                        </Link>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className="flex gap-2.5"
                            >
                                <Avatar>
                                    <AvatarFallback className='text-white'>
                                        {userData?.user.firstName.slice(0, 1).toLocaleUpperCase()} {userData?.user.lastName.slice(0, 1).toLocaleUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium text-blue-600 font-mono">
                                        {userData?.user.firstName} {userData?.user.lastName}
                                    </span>
                                    <span className="text-gray-400 truncate text-sm font-mono">
                                        {userData?.user.email}
                                    </span>
                                </div>
                                <EllipsisIcon className="ml-auto size-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-65.75 p-0 rounded-none"
                            side={"right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem className='p-4 rounded-none' asChild>
                                    <Link className='p-4' href={"/account"}>
                                        <UserRound />
                                        Account
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='p-4 rounded-none' asChild>
                                    <Link className='p-4' href={"/"}>
                                        <Bolt />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>

                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <SignOutButton />

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </aside>

            <main className='w-full bg-[#F9FAFB] space-y-6 flex flex-col'>
                <Breadcrumb />

                <div className=' flex-col flex flex-1'>
                    {isAdmin ? admin : user}
                </div>

                {/* {children} */}
            </main>
        </div>
    )
}

export default layoutDashboard