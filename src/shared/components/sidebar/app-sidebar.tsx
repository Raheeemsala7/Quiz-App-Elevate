import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/src/shared/components/ui/sidebar"
import Link from "next/link"
import LogoApp from "../icons/Logo"

export function AppSidebar() {
    return (
        <Sidebar className="!bg-[#EFF6FF] px-4 py-8" >

            <SidebarHeader>
                <Link href="/">
                    <LogoApp className="" />
                </Link>
            </SidebarHeader>

            <SidebarHeader >
                <SidebarTrigger />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <Link href="/">
                                <span className="text-base font-semibold">Acme Inc.</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}