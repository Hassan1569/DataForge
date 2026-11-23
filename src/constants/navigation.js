import {
  LayoutDashboard,
  Database,
  UploadCloud,
  ShieldCheck,
  GitCompareArrows,
  Wand2,
  FileBarChart2,
  History,
  Settings as SettingsIcon,
} from 'lucide-react';
import { ROUTES } from './routes.js';

export const PRIMARY_NAV = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: LayoutDashboard },
    ],
  },
  {
    section: 'Data',
    items: [
      { label: 'Datasets',       to: ROUTES.DATASETS,      icon: Database },
      { label: 'Import Wizard',  to: ROUTES.IMPORT_WIZARD, icon: UploadCloud },
      { label: 'Import History', to: ROUTES.HISTORY,       icon: History },
    ],
  },
  {
    section: 'Quality',
    items: [
      { label: 'Validation',      to: ROUTES.VALIDATION,      icon: ShieldCheck },
      { label: 'Reconciliation',  to: ROUTES.RECONCILIATION,  icon: GitCompareArrows },
      { label: 'Transformations', to: ROUTES.TRANSFORMATIONS, icon: Wand2 },
    ],
  },
  {
    section: 'Output',
    items: [
      { label: 'Reports',  to: ROUTES.REPORTS,  icon: FileBarChart2 },
      { label: 'Settings', to: ROUTES.SETTINGS, icon: SettingsIcon },
    ],
  },
];