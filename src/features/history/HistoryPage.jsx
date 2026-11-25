import { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer.jsx';
import { Card } from '@/components/ui/Card.jsx';
import Loader from '@/components/ui/Loader.jsx';
import { historyService } from '@/services/mock/historyService.js';
import { exportToJson } from '@/utils/exporters.js';
import Swal from 'sweetalert2';

import ImportHistoryTable from './components/ImportHistoryTable.jsx';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await historyService.getHistory();
      setHistory(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleExport = (job) => {
    // Generate a mock report for the download
    const report = {
      importId: job.id,
      datasetName: job.datasetName,
      processedAt: job.createdAt,
      summary: {
        total: job.recordsProcessed,
        successful: job.successfulRecords,
        failed: job.failedRecords,
      }
    };
    
    exportToJson(report, `report-${job.id}.json`);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Report downloaded',
      showConfirmButton: false,
      timer: 2000
    });
  };

  return (
    <PageContainer
      title="Import History"
      description="A log of all dataset imports and their outcomes."
    >
      <Card>
        {isLoading ? (
          <div className="py-20"><Loader label="Loading history…" /></div>
        ) : (
          <ImportHistoryTable history={history} onExport={handleExport} />
        )}
      </Card>
    </PageContainer>
  );
}