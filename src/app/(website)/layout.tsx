
import { authOptions } from '@/src/auth'
import Breadcrumb from '@/src/shared/components/breadcrumb'
import LogoApp from '@/src/shared/components/icons/Logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/shared/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/src/shared/components/ui/dropdown-menu'
import { cn } from '@/src/shared/lib/utils'
import { Bolt, EllipsisIcon, GraduationCap, HomeIcon, LogOutIcon, UserRound } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

interface IProps {
    children: React.ReactNode
    admin: React.ReactNode
    user: React.ReactNode
}

const layoutDashboard = async ({ children, admin, user }: IProps) => {
    const isAdmin = false


    const userData = await getServerSession(authOptions)

    console.log(userData?.user)



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
                    <div className='space-y-2'>
                        <Link href={"/"} className='flex p-4 gap-2.5 group  hover:bg-blue-100 border border-transparent hover:border-blue-600 transition-all'>
                            <GraduationCap className='size-6 text-gray-500 group-hover:text-blue-600 transition-colors' />
                            <span className='text-gray-500 group-hover:text-blue-600 font-mono text-base transition-colors'>Diploma</span>
                        </Link>
                        <Link href={"/"} className='flex p-4 gap-2.5 group  hover:bg-blue-100 hover:border border-blue-600 transition-all'>
                            <UserRound className='size-6 text-gray-500 group-hover:text-blue-600 transition-colors' />
                            <span className='text-gray-500 group-hover:text-blue-600 font-mono text-base transition-colors'>Account</span>
                        </Link>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className="flex gap-2.5"
                            >
                                <Avatar>
                                    <AvatarFallback className='text-white'>
                                        {userData?.user.firstName.slice(0,1).toLocaleUpperCase()} {userData?.user.lastName.slice(0,1).toLocaleUpperCase()}
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
                            <DropdownMenuItem className='p-4 text-red-600'>
                                <LogOutIcon />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </aside>

            <main className='w-full bg-[#F9FAFB] p-4'>
                <Breadcrumb />

                {isAdmin ? admin : user}

                {/* {children} */}
            </main>
        </div>
    )
}

export default layoutDashboard