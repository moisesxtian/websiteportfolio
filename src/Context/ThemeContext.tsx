import {
  createContext,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (event?: MouseEvent<HTMLElement>) => void;
  setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = 'portfolio-theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.style.colorScheme = theme;
}

function setCircleOrigin(event?: MouseEvent<HTMLElement>) {
  const root = document.documentElement;
  let x = window.innerWidth - 48;
  let y = 32;

  if (event?.currentTarget instanceof HTMLElement) {
    const rect = event.currentTarget.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  root.style.setProperty('--theme-toggle-x', `${x}px`);
  root.style.setProperty('--theme-toggle-y', `${y}px`);
  root.style.setProperty('--theme-toggle-r', `${endRadius}px`);
}

function canUseViewTransition(): boolean {
  if (typeof document.startViewTransition !== 'function') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  // View Transitions can be flaky on some mobile browsers - skip animation, still toggle.
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  return true;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyThemeClass(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (next: Theme) => {
    applyThemeClass(next);
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  };

  const toggleTheme = (event?: MouseEvent<HTMLElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';

    setCircleOrigin(event);

    const apply = () => {
      applyThemeClass(next);
      localStorage.setItem(STORAGE_KEY, next);
      flushSync(() => {
        setThemeState(next);
      });
    };

    if (canUseViewTransition()) {
      try {
        document.startViewTransition!(apply);
        return;
      } catch {
        // Fall through to instant toggle
      }
    }

    apply();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}
