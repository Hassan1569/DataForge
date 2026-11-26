import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext.jsx';

export default function Header({ onToggleSidebar, sidebarOpen }) {
  const { theme, setTheme } = useSettings();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-ink-200 bg-white px-4 lg:px-6 dark:bg-ink-900 dark:border-ink-800 transition-colors">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        className="inline-flex h-9 w-9 items-center justify-center rounded text-ink-600 hover:bg-ink-100 lg:hidden dark:text-ink-300 dark:hover:bg-ink-800"
      >
        <Menu size={18} />
      </button>

      <div className="hidden flex-1 items-center md:flex">
        <label className="relative w-full max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-500" />
          <input
            type="search"
            placeholder="Search datasets, imports, reports…"
            className="h-9 w-full pl-9"
          />
        </label>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="inline-flex h-9 w-9 items-center justify-center rounded text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="inline-flex h-9 w-9 items-center justify-center rounded text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
        >
          <Bell size={16} />
        </button>
        <div className="flex items-center gap-2 rounded border border-ink-200 bg-white px-2 py-1 dark:bg-ink-800 dark:border-ink-700">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-500 text-[10px] font-bold text-white">
            DF
          </div>
          <div className="hidden text-left leading-tight sm:block pr-2">
            <p className="text-xs font-semibold text-ink-900 dark:text-white">Operations</p>
            <p className="text-[10px] text-ink-500 dark:text-ink-400">admin@dataforge.io</p>
          </div>
        </div>
      </div>
    </header>
  );
}