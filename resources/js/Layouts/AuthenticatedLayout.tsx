import { PropsWithChildren, ReactNode, useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { MenuItemProp, User } from "@/types";
import { ChevronLeft, ChevronRight, CircleUser, Search, UserIcon, Menu, X } from "lucide-react";
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');

        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setIsMobile(!e.matches);
            setIsSidebarOpen(e.matches);
            setIsCollapsed(false);
        };

        handleMediaQueryChange({ matches: mediaQuery.matches } as MediaQueryListEvent);
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                links={links}
                isCollapsed={!isMobile && isCollapsed}
                onToggleCollapse={() => !isMobile && setIsCollapsed(!isCollapsed)}
                isMobile={isMobile}
                isSidebarOpen={isSidebarOpen}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="mr-2 md:hidden"
                    >
                        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                    <div className="w-full flex-1 flex gap-4 justify-end items-center">
                        <div className="space-x-4">
                            <AppearanceDropdown />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <CircleUser className="h-5 w-5" />
                                        <span className="sr-only">
                                            Toggle user menu
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                >
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {user.name}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="cursor-pointer"
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="cursor-pointer w-full"
                                            href={route("logout")}
                                            method={"post"}
                                            as={"button"}
                                        >
                                            Log out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-background">
                    <div className="container mx-auto py-6">
                        {header}
                        {children}
                    </div>
                </main>
            </div>

            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
