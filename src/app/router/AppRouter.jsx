import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout.jsx';
import { ROUTES } from '@/constants/routes.js';

import DashboardPage from '@/features/dashboard/DashboardPage.jsx';
import ComingSoonPage from './ComingSoonPage.jsx';

// Placeholders (Phase 3+ will replace with real modules)
import DatasetsPage from '@/features/datasets/DatasetsPage.jsx';
import DatasetDetailPage from '@/features/datasets/DatasetDetailPage.jsx';
import ImportWizardPage from '@/features/imports/ImportWizardPage.jsx';
import ValidationPage from '@/features/validation/ValidationPage.jsx';
import ReconciliationPage from '@/features/reconciliation/ReconciliationPage.jsx';
import TransformationsPage from '@/features/transformations/TransformationsPage.jsx';
import ReportsPage from '@/features/reports/ReportsPage.jsx';
import HistoryPage from '@/features/history/HistoryPage.jsx';
import SettingsPage from '@/features/settings/SettingsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'datasets', element: <DatasetsPage /> },
      { path: 'datasets/:datasetId', element: <DatasetDetailPage /> },
      { path: 'imports/new', element: <ImportWizardPage /> },
      { path: 'imports/history', element: <HistoryPage /> },
      { path: 'validation', element: <ValidationPage /> },
      { path: 'reconciliation', element: <ReconciliationPage /> },
      { path: 'transformations', element: <TransformationsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

export { ComingSoonPage };