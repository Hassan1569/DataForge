import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';
import Badge from '@/components/ui/Badge.jsx';

export default function StepValidate({ 
  parsedData, 
  validationResult, 
  isValidating, 
  onRunValidation, 
  onNext, 
  onBack 
}) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-ink-900">Data Validation</h3>
        <p className="text-sm text-ink-500">
          Check your mapped data against the standard DataForge schema.
        </p>
      </div>

      {!validationResult ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-ink-200 bg-ink-50 py-16 text-center">
          <ShieldCheck size={48} className="mb-4 text-brand-500 opacity-80" />
          <h4 className="mb-2 text-lg font-semibold text-ink-900">Ready to validate</h4>
          <p className="mb-6 max-w-md text-sm text-ink-500">
            This will check {parsedData.length} rows for missing required fields, invalid types, and duplicate IDs.
          </p>
          <Button onClick={onRunValidation} disabled={isValidating}>
            {isValidating ? 'Running validation checks…' : 'Run Validation Checks'}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Banner */}
          {validationResult.isValid ? (
            <div className="flex items-center gap-4 rounded-lg border border-success-200 bg-success-50 p-4">
              <CheckCircle2 size={24} className="text-success-600" />
              <div>
                <p className="font-semibold text-success-900">Validation Passed</p>
                <p className="text-sm text-success-700">All rows passed the required schema checks.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 rounded-lg border border-warning-200 bg-warning-50 p-4">
              <AlertTriangle size={24} className="text-warning-600" />
              <div>
                <p className="font-semibold text-warning-900">Validation Warnings</p>
                <p className="text-sm text-warning-700">
                  Found {validationResult.summary.totalErrors} issues across {validationResult.summary.errorRows} rows. You can still proceed, but data quality may be impacted.
                </p>
              </div>
            </div>
          )}
          
          {/* Stats Grid */}
          <div className="rounded-lg border border-ink-200 bg-white">
             <div className="px-4 py-3 border-b border-ink-200 font-medium text-sm text-ink-900">Validation Summary</div>
             <div className="p-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-ink-900">{validationResult.summary.totalRows}</p>
                  <p className="text-xs text-ink-500 uppercase tracking-wider">Rows Checked</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink-900">{validationResult.summary.validRows}</p>
                  <p className="text-xs text-ink-500 uppercase tracking-wider">Valid Rows</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-danger-600">{validationResult.summary.errorRows}</p>
                  <p className="text-xs text-ink-500 uppercase tracking-wider">Rows with Errors</p>
                </div>
             </div>
          </div>

          {/* Error Table */}
          {validationResult.errors.length > 0 && (
            <div className="rounded-lg border border-ink-200 bg-white overflow-hidden">
              <div className="px-4 py-3 border-b border-ink-200 font-medium text-sm text-ink-900 bg-ink-50">Detailed Errors (showing first 10)</div>
              <div className="table-scroll max-h-64 overflow-y-auto">
                <table className="min-w-full divide-y divide-ink-200">
                  <thead className="bg-white sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-ink-500">Row</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-ink-500">Field</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-ink-500">Issue</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-ink-500">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-200">
                    {validationResult.errors.slice(0, 10).map((err, i) => (
                      <tr key={i} className="hover:bg-danger-50/50">
                        <td className="px-4 py-2 text-sm text-ink-600">{err.row}</td>
                        <td className="px-4 py-2 text-sm font-medium text-ink-900">{err.field}</td>
                        <td className="px-4 py-2 text-sm">
                          <Badge tone="danger">{err.type.replace('_', ' ')}</Badge>
                        </td>
                        <td className="px-4 py-2 text-sm text-ink-500 italic truncate max-w-[150px]">{String(err.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between border-t border-ink-200 pt-4">
        <Button variant="secondary" onClick={onBack} disabled={isValidating}>Back</Button>
        <Button onClick={onNext} disabled={!validationResult || isValidating}>
          Continue to Review
        </Button>
      </div>
    </div>
  );
}