import { Moon, Sun } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext.jsx';

export default function AppearanceSettings() {
  const { theme, setTheme } = useSettings();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-ink-900 dark:text-white">Theme</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400">Customize how DataForge looks on your device.</p>
      </div>
      <div className="flex gap-4 max-w-md">
        <button
          onClick={() => setTheme('light')}
          className={`flex flex-1 items-center justify-center gap-2 rounded border p-3 transition-colors ${
            theme === 'light' 
              ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-500 dark:bg-brand-900/30 dark:text-brand-400' 
              : 'border-ink-200 bg-white text-ink-600 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
          }`}
        >
          <Sun size={16} /> Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`flex flex-1 items-center justify-center gap-2 rounded border p-3 transition-colors ${
            theme === 'dark' 
              ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-500 dark:bg-brand-900/30 dark:text-brand-400' 
              : 'border-ink-200 bg-white text-ink-600 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
          }`}
        >
          <Moon size={16} /> Dark
        </button>
      </div>
    </div>
  );
}