import { Moon, Sun } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext.jsx';

export default function AppearanceSettings() {
  const { theme, setTheme } = useSettings();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-ink-900">Theme</h3>
        <p className="text-sm text-ink-500">Customize how DataForge looks on your device.</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setTheme('light')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-4 transition-colors ${
            theme === 'light' ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-ink-200 bg-white text-ink-600 hover:bg-ink-50'
          }`}
        >
          <Sun size={18} /> Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-4 transition-colors ${
            theme === 'dark' ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-ink-200 bg-white text-ink-600 hover:bg-ink-50'
          }`}
        >
          <Moon size={18} /> Dark
        </button>
      </div>
    </div>
  );
}