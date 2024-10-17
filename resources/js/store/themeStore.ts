import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => {
                set({ theme });
                document.documentElement.className = theme;
            },
        }),
        {
            name: 'theme-storage',
        }
    )
)

// Apply the theme on initial load
const { theme } = useThemeStore.getState();
document.documentElement.className = theme;
