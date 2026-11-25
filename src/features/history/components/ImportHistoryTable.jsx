import { format } from 'date-fns';
import { Download, FileText, CheckCircle2, XCircle } from 'lucide-react';
import Badge from '@/components/ui/Badge.jsx';
import Button from '@/components/ui/Button.jsx';

export default function ImportHistoryTable({ history, onExport }) {
  return (
    <div className="table-scroll">
      <table className="min-w-full divide-y divide-ink-200">
        <thead className="bg-ink-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-ink-500 uppercase">Dataset Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-ink-500 uppercase">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-ink-500 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-ink-500 uppercase">Records</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-ink-500 uppercase">Duration</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-ink-500 uppercase">Report</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-200 bg-white">
          {history.map((job) => (
            <tr key={job.id} className="hover:bg-ink-50/50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-ink-400" />
                  <span className="text-sm font-medium text-ink-900">{job.datasetName}</span>
                </div>
                <p className="text-xs text-ink-500">{job.id} · {job.format.toUpperCase()}</p>
              </td>
              <td className="px-4 py-3 text-sm text-ink-500 whitespace-nowrap">
                {format(new Date(job.createdAt), 'MMM d, yyyy HH:mm')}
              </td>
              <td className="px-4 py-3">
                <Badge tone={job.status === 'completed' ? 'success' : 'danger'}>
                  {job.status === 'completed' ? 'Success' : 'Failed'}
                </Badge>
              </td>
              <td className="px-4 py-3 text-sm text-ink-600">
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-success-600"><CheckCircle2 size={12}/> {job.successfulRecords.toLocaleString()}</span>
                  {job.failedRecords > 0 && (
                    <span className="flex items-center gap-1 text-danger-600"><XCircle size={12}/> {job.failedRecords.toLocaleString()}</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-ink-500">
                {(job.durationMs / 1000).toFixed(1)}s
              </td>
              <td className="px-4 py-3 text-right">
                <Button size="sm" variant="ghost" onClick={() => onExport(job)}>
                  <Download size={14} className="mr-1" /> Export
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}