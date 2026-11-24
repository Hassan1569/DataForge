import { Card, CardBody } from '@/components/ui/Card.jsx';
import { formatNumber } from '@/utils/formatters.js';

const TONE_RING = {
  brand:   'text-brand-600 bg-brand-50',
  info:    'text-info-600 bg-info-50',
  success: 'text-success-600 bg-success-50',
  warning: 'text-warning-600 bg-warning-50',
  danger:  'text-danger-600 bg-danger-50',
};

export default function MetricCard({ title, value, icon: Icon, tone = 'brand', hint }) {
  return (
    <Card>
      <CardBody className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-500">
            {title}
          </p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
          {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
        </div>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${TONE_RING[tone]}`}>
          <Icon size={16} />
        </div>
      </CardBody>
    </Card>
  );
}