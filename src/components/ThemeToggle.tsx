import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme(e);
      }}
      className="fixed top-3 right-3 z-[70] inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-gray-700 transition-colors hover:text-main-color dark:text-gray-300 sm:top-4 sm:right-4 md:right-6 touch-manipulation"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
