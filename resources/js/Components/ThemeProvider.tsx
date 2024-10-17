
import React from "react";
import { useThemeStore } from "@/store/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();

    React.useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return <>{children}</>;
}
