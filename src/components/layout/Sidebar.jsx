import { NavLink } from 'react-router-dom';
import { Database } from 'lucide-react';
import { PRIMARY_NAV } from '@/constants/navigation.js';

function SidebarItem({ to, label, icon: Icon, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm',
          'transition-colors duration-100',
          isActive
            ? 'bg-brand-600 text-white'
            : 'text-ink-300 hover:bg-ink-800 hover:text-white',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={16} className={isActive ? 'text-white' : 'text-ink-400 group-hover:text-white'} />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-full w-64 flex-col bg-ink-900 text-white">
      <div className="flex h-14 items-center gap-2 border-b border-ink-800 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600">
          <Database size={16} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">DataForge</p>
          <p className="truncate text-[10px] uppercase tracking-wider text-ink-400">Data Workbench</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {PRIMARY_NAV.map((group) => (
          <div key={group.section} className="mb-4">
            <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-500">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarItem
                  key={item.to}
                  {...item}
                  end={item.to === '/'}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-ink-800 px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-ink-500">Build</p>
        <p className="text-xs text-ink-400">v0.1.0 · portfolio</p>
      </div>
    </aside>
  );
}