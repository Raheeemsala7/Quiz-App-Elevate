
import { AppSidebar } from '@/src/features/components/sidebar/app-sidebar'
import { SidebarProvider } from '@/src/features/components/ui/sidebar'
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
            <main className='w-full bg-[#F9FAFB] p-4'>

                {isAdmin ? admin : user }

                {/* {children} */}
            </main>
        </SidebarProvider>
    )
}

export default layoutDashboard