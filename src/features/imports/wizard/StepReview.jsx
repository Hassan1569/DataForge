import Swal from 'sweetalert2';
import { CheckCircle2, Database, FileText } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';
import { datasetService } from '@/services/mock/datasetService.js';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.js';

export default function StepReview({ file, format, parsedData, onBack }) {
  const navigate = useNavigate();

  const handleComplete = async () => {
    try {
      // Save to our mock service (Phase 3)
      await datasetService.createDataset({
        name: file.name,
        format: format,
        recordCount: parsedData.length,
        status: 'completed',
        errorCount: 0
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

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <dt className="text-sm font-medium text-ink-500">Total Records</dt>
              <dd className="mt-1 text-lg font-semibold text-ink-900">{parsedData.length}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-500">Validation Status</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-lg font-semibold text-success-600">
                <CheckCircle2 size={18} /> Passed
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-500">Destination</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-sm text-ink-900">
                <Database size={16} className="text-ink-400" /> Main Datasets Folder
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8 flex justify-between border-t border-ink-200 pt-4">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button onClick={handleComplete} className="bg-success-600 hover:bg-success-700">
          Complete Import
        </Button>
      </div>
    </div>
  );
}