import { HardDrive } from 'lucide-react';

export default function StorageInfo() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-ink-900 dark:text-white">Data & Storage</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400">Information about where your data is currently stored.</p>
      </div>
      
      <div className="rounded border border-ink-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-ink-100 text-ink-600 dark:bg-ink-900 dark:text-ink-300">
            <HardDrive size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-white">Browser Local Storage</p>
            <p className="text-xs text-ink-500 dark:text-ink-400">Mock DB active</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-ink-600 dark:text-ink-400">
            <span>Mock API Cache</span>
            <span className="font-medium">2.4 MB</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-900">
            <div className="h-full w-1/4 bg-brand-500" />
          </div>
          <p className="text-[10px] text-ink-400 text-right dark:text-ink-500">Future Laravel API will replace local storage.</p>
        </div>
      </div>
    </div>
  );
}