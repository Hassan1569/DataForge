import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';

const TARGET_FIELDS = ['id', 'date', 'amount', 'name', 'description', 'status', 'reference'];

export default function StepMapping({ headers, mapping, onMapChange, onNext, onBack }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-ink-900">Map Source Fields</h3>
        <p className="text-sm text-ink-500">
          Match your file's columns to DataForge's standard fields. Unmapped fields will be preserved but may not be validated.
        </p>
      </div>

      <div className="rounded-lg border border-ink-200 bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 bg-ink-50 px-6 py-3 text-xs font-semibold text-ink-600 uppercase tracking-wider border-b border-ink-200">
          <div>Source Column</div>
          <div></div>
          <div>Target Field</div>
        </div>
        <div className="divide-y divide-ink-200">
          {headers.map(sourceField => (
            <div key={sourceField} className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center px-6 py-3 hover:bg-ink-50/50">
              <div className="text-sm font-medium text-ink-900">{sourceField}</div>
              <ArrowRight size={16} className="text-ink-400" />
              <div>
                <select
                  value={mapping[sourceField] || ''}
                  onChange={(e) => onMapChange(sourceField, e.target.value)}
                  className="w-full max-w-xs rounded-md border border-ink-300 bg-white px-3 py-1.5 text-sm text-ink-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  <option value="">-- Ignore Field --</option>
                  {TARGET_FIELDS.map(target => (
                    <option key={target} value={target}>{target}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between border-t border-ink-200 pt-4">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Validate Data</Button>
      </div>
    </div>
  );
}