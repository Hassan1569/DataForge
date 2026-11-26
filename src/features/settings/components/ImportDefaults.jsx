import { useSettings } from '@/context/SettingsContext.jsx';

export default function ImportDefaults() {
  const { defaultFormat, setDefaultFormat, strictValidation, setStrictValidation } = useSettings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-ink-900 dark:text-white">Import Defaults</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400">Configure default behaviors for the Import Wizard.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Default File Format</label>
          <select
            value={defaultFormat}
            onChange={(e) => setDefaultFormat(e.target.value)}
            className="w-full max-w-xs block"
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="xml">XML</option>
          </select>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="strict"
            checked={strictValidation}
            onChange={(e) => setStrictValidation(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-600 dark:border-ink-600 dark:bg-ink-900"
          />
          <div>
            <label htmlFor="strict" className="text-sm font-medium text-ink-900 dark:text-white">Strict Validation Mode</label>
            <p className="text-xs text-ink-500 dark:text-ink-400">Fail imports if any validation errors are found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}