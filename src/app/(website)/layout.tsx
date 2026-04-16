
import Breadcrumb from '@/src/shared/components/breadcrumb'
import { AppSidebar } from '@/src/shared/components/sidebar/app-sidebar'
import { SidebarProvider } from '@/src/shared/components/ui/sidebar'
import React from 'react'

interface IProps {
    children: React.ReactNode
    admin: React.ReactNode
    user: React.ReactNode
}

const layoutDashboard =  async ({ children, admin, user }: IProps) => {
    const isAdmin = false



    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full bg-[#F9FAFB] p-4'>
                <Breadcrumb />

                {isAdmin ? admin : user}

                {/* {children} */}
            </main>
        </SidebarProvider>
    )
}

export default layoutDashboard