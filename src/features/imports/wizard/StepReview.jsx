import Swal from 'sweetalert2';
import { CheckCircle2, Database, FileText, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';
import { datasetService } from '@/services/mock/datasetService.js';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.js';

export default function StepReview({ file, format, parsedData, validationResult, onBack }) {
  const navigate = useNavigate();

  const handleComplete = async () => {
    try {
      const isClean = validationResult?.isValid ?? true;
      
      await datasetService.createDataset({
        name: file.name,
        format: format,
        recordCount: parsedData.length,
        status: isClean ? 'completed' : 'completed', // Could mark as 'warning' in future
        errorCount: validationResult?.summary?.totalErrors || 0
      });

      await Swal.fire({
        title: 'Import Successful!',
        text: `${parsedData.length} records have been added to your datasets.`,
        icon: 'success',
        confirmButtonColor: '#1e46d6',
        confirmButtonText: 'Go to Datasets'
      });

      navigate(ROUTES.DATASETS);
    } catch (err) {
      Swal.fire('Error', 'Failed to save dataset.', 'error');
    }
  };

  const isClean = validationResult?.isValid ?? true;

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-ink-900">Review & Complete</h3>
        <p className="text-sm text-ink-500">
          Review the import details before saving to the database.
        </p>
      </div>

      <div className="rounded-lg border border-ink-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 border-b border-ink-200 pb-6 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="text-lg font-medium text-ink-900">{file?.name}</h4>
              <p className="text-sm text-ink-500">{format?.toUpperCase()} File</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
            <div>
              <dt className="text-sm font-medium text-ink-500">Total Records</dt>
              <dd className="mt-1 text-lg font-semibold text-ink-900">{parsedData.length}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-500">Validation Status</dt>
              <dd className={`mt-1 flex items-center gap-1.5 text-lg font-semibold ${isClean ? 'text-success-600' : 'text-warning-600'}`}>
                {isClean ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                {isClean ? 'Clean' : `${validationResult.summary.totalErrors} Issues`}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-500">Destination</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-sm text-ink-900 mt-2">
                <Database size={16} className="text-ink-400" /> Main Datasets
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8 flex justify-between border-t border-ink-200 pt-4">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button onClick={handleComplete} className={isClean ? 'bg-success-600 hover:bg-success-700' : 'bg-warning-600 hover:bg-warning-700'}>
          Complete Import
        </Button>
      </div>
    </div>
  );
}