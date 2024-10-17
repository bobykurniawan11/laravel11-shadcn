import ApplicationLogo from "@/Components/ApplicationLogo";
import { ThemeSwitcher } from "@/Components/ThemeSwitcher";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background">
            <div className="absolute top-4 right-4">
                <ThemeSwitcher />
            </div>
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4">{children}</div>
        </div>
    );
}
