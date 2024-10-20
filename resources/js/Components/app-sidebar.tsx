import { List, Home, Inbox, Search, Settings, User, ChevronDown } from "lucide-react"
import { router } from "@inertiajs/react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,

} from "@/Components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { User2, ChevronUp } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import React from "react"
// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Master Data",
        url: "#",
        icon: List,
        children: [
            { title: "Users", icon: () => <div className="w-4 h-4" />, url: "/master-data/users" },
            { title: "Products", icon: () => <div className="w-4 h-4" />, url: "/master-data/products" },
        ],
    }
]


export function AppSidebar() {
    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-bold mb-4">Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {items.map((item) => (
                                <MenuItem key={item.title} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full justify-between">
                                    <span className="flex items-center">
                                        <User2 className="mr-2 h-4 w-4" />
                                        Username
                                    </span>
                                    <ChevronUp className="h-4 w-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

function MenuItem({ item }: { item: typeof items[number] }) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                className="w-full justify-between"
                onClick={() => item.children && setIsOpen(!isOpen)}
            >
                <a href={item.url}>
                    <span className="flex items-center">
                        <item.icon />
                        <span className="ml-2">{item.title}</span>
                    </span>
                    {item.children && (
                        <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="h-4 w-4" />
                        </motion.span>
                    )}
                </a>
            </SidebarMenuButton>
            {item.children && (
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <SidebarMenuSub className="space-y-1 mt-1">
                                {item.children.map((child) => (
                                    <SidebarMenuSubItem key={child.title}>
                                        <SidebarMenuSubButton asChild>
                                            <a href={child.url} className="flex items-center">
                                                <child.icon />
                                                <span className="ml-2">{child.title}</span>
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </SidebarMenuItem>
    )
}