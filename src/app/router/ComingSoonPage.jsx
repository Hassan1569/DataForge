import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer.jsx';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';

export default function ComingSoonPage({ title }) {
  const { pathname } = useLocation();
  return (
    <PageContainer title={title} description="This module ships in a later phase.">
      <Card>
        <CardBody>
          <EmptyState
            icon={Construction}
            title="Module scaffolded"
            description={`Route ${pathname} is wired up. The feature will be implemented in a later phase.`}
          />
        </CardBody>
      </Card>
    </PageContainer>
  );
}