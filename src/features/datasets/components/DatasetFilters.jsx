import { Search } from 'lucide-react';

export default function DatasetFilters({ search, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="flex flex-col gap-3 border-b border-ink-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full max-w-sm">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          placeholder="Search datasets by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 w-full rounded-md border border-ink-200 pl-9 pr-3 text-sm text-ink-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-9 rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
  );
}