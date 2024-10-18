import { Link, usePage } from "@inertiajs/react";
import { AlignJustifyIcon, Home, Icon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/Components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { MenuItemProp } from "@/types";
import ApplicationLogo from "@/Components/ApplicationLogo";

type Props = {
    links: MenuItemProp[];
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    isMobile: boolean;
    isSidebarOpen: boolean;
};

type MenuItemProps = {
    link: MenuItemProp;
    isActive?: boolean;
};

const CollapsedMenuItem = ({ link, isActive }: MenuItemProps) => {
    const Icon = (link.icon ?? AlignJustifyIcon) as React.ElementType;

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    href={link.href}
                    className={cn(
                        buttonVariants({
                            variant: isActive ? "default" : "ghost",
                            size: "icon",
                        }),
                        "h-9 w-9",
                        link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                >
                    {<Icon className="h-4 w-4" />}
                    <span className="sr-only">{link.title}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
            </TooltipContent>
        </Tooltip>
    );
};

const ExpandedMenuItem = ({ link, isActive }: MenuItemProps) => {
    const Icon = (link.icon ?? AlignJustifyIcon) as React.ElementType;

    return (
        <Link
            href={link.href}
            className={cn(
                buttonVariants({ variant: isActive ? "default" : "ghost" }),
                "justify-start"
            )}
        >
            {<Icon className="mr-2 h-4 w-4" />}
            {link.title}
        </Link>
    );
};

const Sidebar = ({ links, isCollapsed, onToggleCollapse, isMobile, isSidebarOpen }: Props) => {
    const { url } = usePage();

    return (
        <TooltipProvider>
            <nav className={cn(
                "bg-background h-full",
                isMobile
                    ? cn("fixed inset-y-0 left-0 z-50 w-[250px] transition-transform duration-300 ease-in-out transform",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full")
                    : cn("relative", isCollapsed ? "w-[60px]" : "w-[250px]")
            )}>
                <div className="flex h-full flex-col">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
                        <Link href="/" className="flex items-center font-semibold">
                            <ApplicationLogo className="h-6 w-6 fill-current text-gray-500" />
                            {(!isCollapsed || isMobile) && <span className="pl-2">Acme Inc</span>}
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto border-r">
                        <nav className="grid items-start gap-2 p-4 text-sm font-medium">
                            {links.map((link, index) =>
                                isCollapsed && !isMobile ? (
                                    <CollapsedMenuItem
                                        key={index}
                                        link={link}
                                        isActive={url.startsWith(link.href)}
                                    />
                                ) : (
                                    <ExpandedMenuItem
                                        key={index}
                                        link={link}
                                        isActive={url.startsWith(link.href)}
                                    />
                                )
                            )}
                        </nav>
                    </div>
                </div>
                {!isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleCollapse}
                        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-background border shadow-md"
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                )}
            </nav>
        </TooltipProvider>
    );
};

export default Sidebar;
