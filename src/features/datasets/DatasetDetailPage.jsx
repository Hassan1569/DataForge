import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer.jsx';
import Button from '@/components/ui/Button.jsx';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';

export default function DatasetDetailPage() {
  const { datasetId } = useParams();

  return (
    <PageContainer
      title={`Dataset Workspace`}
      description={`Viewing details for record: ${datasetId}`}
      actions={
        <Link to="/datasets">
          <Button size="sm" variant="secondary">
            <ArrowLeft size={14} /> Back to Datasets
          </Button>
        </Link>
      }
    >
      <Card>
        <CardBody>
          <EmptyState 
            title="Workspace scaffolded" 
            description="The full data workspace, preview tables, and validation summaries will be built in later phases."
          />
        </CardBody>
      </Card>
    </PageContainer>
  );
}