import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "@/Components/ThemeProvider";
import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const App = ({ Component, pageProps }: { Component: React.ComponentType<any>; pageProps: any }) => {
    const { theme } = useThemeStore();

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
