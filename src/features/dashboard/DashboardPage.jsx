import { Database, FileCheck2, Upload, AlertTriangle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageContainer from '@/components/layout/PageContainer.jsx';
import { Card, CardBody, CardHeader } from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';
import Loader from '@/components/ui/Loader.jsx';
import { ROUTES } from '@/constants/routes.js';
import { useDashboard } from '@/hooks/useDashboard.js';

import MetricCard, { metricContainer } from './components/MetricCard.jsx';
import RecentActivityList from './components/RecentActivityList.jsx';
import DataQualityPanel from './components/DataQualityPanel.jsx';

export default function DashboardPage() {
  const { metrics, activity, isLoading, error } = useDashboard();

  if (error) {
    return (
      <PageContainer title="Dashboard">
        <div className="rounded-md border border-danger-600/20 bg-danger-50 p-4 text-sm text-danger-700">
          {error}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Dashboard"
      description="Operational overview of imports, validation, and reconciliation."
      actions={
        <Link to={ROUTES.IMPORT_WIZARD}>
          <Button size="sm" variant="primary">
            <Upload size={14} className="mr-2" />
            New Import
          </Button>
        </Link>
      }
    >
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader label="Loading dashboard metrics…" />
        </div>
      ) : (
        <>
          {/* Animated Metrics Row */}
          <motion.div 
            variants={metricContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
          >
            <MetricCard title="Total Datasets" value={metrics.totalDatasets} icon={Database} tone="brand" />
            <MetricCard title="Records Processed" value={metrics.totalRecords} icon={FileCheck2} tone="info" />
            <MetricCard title="Successful Imports" value={metrics.successfulImports} icon={Upload} tone="success" />
            <MetricCard title="Failed Imports" value={metrics.failedImports} icon={XCircle} tone="danger" />
            <MetricCard title="Validation Errors" value={metrics.validationErrors} icon={AlertTriangle} tone="warning" />
          </motion.div>

          {/* Lower Grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Card hoverEffect className="h-full">
                <CardHeader
                  title="Recent Activity"
                  description="Latest system and user events."
                />
                <CardBody>
                  <RecentActivityList activities={activity} />
                </CardBody>
              </Card>
            </div>

            <Card hoverEffect className="h-full">
              <CardHeader
                title="Data Quality Overview"
                description="Derived from recent imports."
              />
              <CardBody>
                <DataQualityPanel metrics={metrics} />
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </PageContainer>
  );
}