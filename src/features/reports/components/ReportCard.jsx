import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';

export default function ReportCard({ title, description, onExportCsv, onExportJson, icon: Icon }) {
  return (
    <Card>
      <CardBody className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Icon size={20} />
          </div>
          <h3 className="text-base font-semibold text-ink-900">{title}</h3>
        </div>
        <p className="text-sm text-ink-500 mb-6 flex-1">{description}</p>
        
        <div className="flex gap-2 mt-auto">
          <Button size="sm" variant="secondary" className="flex-1" onClick={onExportCsv}>
            <FileSpreadsheet size={14} className="mr-1" /> CSV
          </Button>
          <Button size="sm" variant="secondary" className="flex-1" onClick={onExportJson}>
            <FileJson size={14} className="mr-1" /> JSON
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}