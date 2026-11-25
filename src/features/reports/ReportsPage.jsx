import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer.jsx';
import Swal from 'sweetalert2';
import { BarChart3, Database, ShieldCheck, GitCompareArrows } from 'lucide-react';
import { exportToCsv, exportToJson } from '@/utils/exporters.js';
import mockSources from '@/data/fixtures/reconciliationSources.json';

import ReportCard from './components/ReportCard.jsx';

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = (data, filenameBase) => {
    exportToCsv(data, `${filenameBase}.csv`);
    Swal.fire({
      toast: true, position: 'top-end', icon: 'success',
      title: 'Report downloaded', showConfirmButton: false, timer: 2000
    });
  };

  const handleExportJson = (data, filenameBase) => {
    exportToJson(data, `${filenameBase}.json`);
    Swal.fire({
      toast: true, position: 'top-end', icon: 'success',
      title: 'Report downloaded', showConfirmButton: false, timer: 2000
    });
  };

  // Generate mock aggregate data for reports
  const dataQualityReport = [
    { metric: 'Total Records Checked', value: 14520 },
    { metric: 'Valid Records', value: 14450 },
    { metric: 'Missing Values', value: 45 },
    { metric: 'Type Mismatches', value: 25 },
  ];

  return (
    <PageContainer
      title="Reports"
      description="Generate and export data quality and reconciliation reports."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        <ReportCard 
          title="Data Quality Summary"
          description="Aggregated validation metrics across all imported datasets."
          icon={ShieldCheck}
          onExportCsv={() => handleExport(dataQualityReport, 'data_quality_report')}
          onExportJson={() => handleExportJson(dataQualityReport, 'data_quality_report')}
        />

        <ReportCard 
          title="Import History Log"
          description="A complete audit trail of all upload, parse, and validation events."
          icon={Database}
          onExportCsv={() => handleExport([{ log: 'mock' }], 'import_log')}
          onExportJson={() => handleExportJson([{ log: 'mock' }], 'import_log')}
        />

        <ReportCard 
          title="Reconciliation Ledger"
          description="Export the latest comparison results between internal and external data."
          icon={GitCompareArrows}
          onExportCsv={() => handleExport(mockSources.sourceA, 'reconciliation_ledger')}
          onExportJson={() => handleExportJson(mockSources.sourceA, 'reconciliation_ledger')}
        />

      </div>
    </PageContainer>
  );
}