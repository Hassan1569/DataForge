import { Menu, Search, Bell } from 'lucide-react';

export default function Header({ onToggleSidebar, sidebarOpen }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-ink-200 bg-white px-4 lg:px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-600 hover:bg-ink-100 lg:hidden"
      >
        <Menu size={18} />
      </button>

      <div className="hidden flex-1 items-center md:flex">
        <label className="relative w-full max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            placeholder="Search datasets, imports, reports…"
            className="h-9 w-full rounded-md border border-ink-200 bg-ink-50 pl-9 pr-3 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none"
          />
        </label>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-600 hover:bg-ink-100"
        >
          <Bell size={17} />
        </button>
        <div className="flex items-center gap-2 rounded-md border border-ink-200 bg-white px-2 py-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
            DF
          </div>
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-xs font-semibold text-ink-900">Operations User</p>
            <p className="text-[10px] text-ink-500">ops@dataforge.io</p>
          </div>
        </div>
      </div>
    </header>
  );
}