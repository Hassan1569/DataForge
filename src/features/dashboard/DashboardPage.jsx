import { Activity, Database, FileCheck2, AlertTriangle, Upload } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer.jsx';
import { Card, CardBody, CardHeader } from '@/components/ui/Card.jsx';
import Badge from '@/components/ui/Badge.jsx';
import Button from '@/components/ui/Button.jsx';

const METRICS = [
  { key: 'datasets',   label: 'Datasets',           value: '—', hint: 'Phase 2 will compute this', icon: Database,      tone: 'brand' },
  { key: 'records',    label: 'Records Processed',  value: '—', hint: 'Phase 2 will compute this', icon: FileCheck2,    tone: 'info' },
  { key: 'success',    label: 'Successful Imports', value: '—', hint: 'Phase 2 will compute this', icon: Upload,        tone: 'success' },
  { key: 'errors',     label: 'Validation Errors',  value: '—', hint: 'Phase 2 will compute this', icon: AlertTriangle, tone: 'warning' },
];

const TONE_RING = {
  brand:   'text-brand-600 bg-brand-50',
  info:    'text-info-600 bg-info-50',
  success: 'text-success-600 bg-success-50',
  warning: 'text-warning-600 bg-warning-50',
};

export default function DashboardPage() {
  return (
    <PageContainer
      title="Dashboard"
      description="Operational overview of imports, validation, and reconciliation."
      actions={
        <Button size="sm" variant="primary" disabled title="Wired up in Phase 4">
          <Upload size={14} />
          New Import
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map(({ key, label, value, hint, icon: Icon, tone }) => (
          <Card key={key}>
            <CardBody className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-500">
                  {label}
                </p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">
                  {value}
                </p>
                <p className="mt-1 text-xs text-ink-400">{hint}</p>
              </div>
              <div className={`flex h-9 w-9 items-center justify-center rounded-md ${TONE_RING[tone]}`}>
                <Icon size={16} />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Recent Activity"
            description="Latest import and validation events."
            actions={<Badge tone="neutral">Phase 2</Badge>}
          />
          <CardBody>
            <div className="flex items-center gap-2 rounded-md border border-dashed border-ink-200 px-4 py-10 text-sm text-ink-500">
              <Activity size={16} />
              Activity feed will stream from the import service in Phase 2.
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Data Quality"
            description="Health of most recent datasets."
            actions={<Badge tone="neutral">Phase 2</Badge>}
          />
          <CardBody>
            <div className="space-y-3">
              {['Completeness', 'Uniqueness', 'Type conformance'].map((label) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-ink-600">{label}</span>
                    <span className="text-ink-400">—</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full w-0 bg-brand-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </PageContainer>
  );
}