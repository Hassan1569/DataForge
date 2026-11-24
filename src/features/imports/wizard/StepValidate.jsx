import { useState } from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';

export default function StepValidate({ parsedData, mapping, onNext, onBack }) {
  // For Phase 4, we simulate the validation step. The full validation engine is built in Phase 5.
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setHasRun(true);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-ink-900">Data Validation</h3>
        <p className="text-sm text-ink-500">
          Run the standard validation schema against the mapped fields.
        </p>
      </div>

      {!hasRun ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-ink-200 bg-ink-50 py-16 text-center">
          <ShieldCheck size={48} className="mb-4 text-brand-500 opacity-80" />
          <h4 className="mb-2 text-lg font-semibold text-ink-900">Ready to validate</h4>
          <p className="mb-6 max-w-md text-sm text-ink-500">
            This will check for missing required fields, invalid data types, and duplicates.
          </p>
          <Button onClick={handleRun} disabled={isRunning}>
            {isRunning ? 'Running checks...' : 'Run Validation Checks'}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-lg border border-success-200 bg-success-50 p-4">
            <ShieldCheck size={24} className="text-success-600" />
            <div>
              <p className="font-semibold text-success-900">Validation Passed</p>
              <p className="text-sm text-success-700">No critical errors detected in this batch.</p>
            </div>
          </div>
          
          <div className="rounded-lg border border-ink-200 bg-white">
             <div className="px-4 py-3 border-b border-ink-200 font-medium text-sm text-ink-900">Validation Summary</div>
             <div className="p-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-ink-900">{parsedData.length}</p>
                  <p className="text-xs text-ink-500 uppercase">Rows Checked</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success-600">0</p>
                  <p className="text-xs text-ink-500 uppercase">Errors</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning-600">0</p>
                  <p className="text-xs text-ink-500 uppercase">Warnings</p>
                </div>
             </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between border-t border-ink-200 pt-4">
        <Button variant="secondary" onClick={onBack} disabled={isRunning}>Back</Button>
        <Button onClick={onNext} disabled={!hasRun || isRunning}>Continue to Review</Button>
      </div>
    </div>
  );
}