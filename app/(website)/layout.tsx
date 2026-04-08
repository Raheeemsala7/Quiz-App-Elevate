import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const layoutDashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default layoutDashboard