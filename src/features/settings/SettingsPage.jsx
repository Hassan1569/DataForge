import PageContainer from '@/components/layout/PageContainer.jsx';
import { Card, CardBody, CardHeader } from '@/components/ui/Card.jsx';

import AppearanceSettings from './components/AppearanceSettings.jsx';
import ImportDefaults from './components/ImportDefaults.jsx';
import StorageInfo from './components/StorageInfo.jsx';

export default function SettingsPage() {
  return (
    <PageContainer
      title="Settings"
      description="Manage your application preferences and data storage options."
    >
      <div className="max-w-4xl space-y-6">
        <Card>
          <CardBody>
            <AppearanceSettings />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <ImportDefaults />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <StorageInfo />
          </CardBody>
        </Card>
      </div>
    </PageContainer>
  );
}