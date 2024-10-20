import { PropsWithChildren, ReactNode, useState } from "react";
import { Link } from "@inertiajs/react";
import { MenuItemProp, User } from "@/types";
import { CircleUser, Search, UserIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import Sidebar from "@/Components/Sidebar";
import MobileMenu from "@/Components/MobileMenu";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { cn } from "@/lib/utils";
import AppearanceDropdown from "@/Components/AppearanceDropdown";
import { ThemeSwitcher } from "@/Components/ThemeSwitcher";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";

const links: MenuItemProp[] = [
    {
        title: "Dashboard",
        href: route("dashboard"),
        variant: "default",
    },
    {
        title: "Profile",
        href: route("profile.edit"),
        variant: "ghost",
        icon: UserIcon,
    },
];

export default function AuthenticatedLayout({
    user,
    header,
    children,
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
}>) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <SidebarProvider>
            <AppSidebar />

            <main className="flex-1 flex flex-col">
                <SidebarTrigger />
                <div className="w-full max-w-4xl flex-1 flex flex-col ">
                    <div className="flex-1 flex p-8">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}
