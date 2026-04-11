import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

interface IProps {
    children: React.ReactNode
    admin : React.ReactNode
    user: React.ReactNode
}

const layoutDashboard = ({ children , admin , user }: IProps) => {
    const isAdmin = false
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full'>
                {/* <SidebarTrigger /> */}

                {isAdmin ? admin : user }

                {/* {children} */}
            </main>
        </SidebarProvider>
    )
}

export default layoutDashboard