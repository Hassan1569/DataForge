import { UploadCloud, ShieldCheck, GitCompareArrows, XCircle } from 'lucide-react';
import { formatDate } from '@/utils/formatters.js';
import EmptyState from '@/components/ui/EmptyState.jsx';

const ACTIVITY_ICONS = {
  import_success: { icon: UploadCloud, color: 'text-success-600 bg-success-50' },
  import_failed: { icon: XCircle, color: 'text-danger-600 bg-danger-50' },
  validation_warning: { icon: ShieldCheck, color: 'text-warning-600 bg-warning-50' },
  reconciliation_complete: { icon: GitCompareArrows, color: 'text-brand-600 bg-brand-50' },
};

export default function RecentActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <EmptyState 
        title="No recent activity" 
        description="Imports and validations will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((act) => {
        const config = ACTIVITY_ICONS[act.type] || ACTIVITY_ICONS.import_success;
        const Icon = config.icon;
        
        return (
          <div key={act.id} className="flex items-start gap-3">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.color}`}>
              <Icon size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink-900">{act.title}</p>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-500">
                <span>{formatDate(act.timestamp)}</span>
                <span>·</span>
                <span>{act.user}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}