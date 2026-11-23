export const ROUTES = Object.freeze({
  DASHBOARD:       '/',
  DATASETS:        '/datasets',
  DATASET_DETAIL:  '/datasets/:datasetId',
  IMPORT_WIZARD:   '/imports/new',
  VALIDATION:      '/validation',
  RECONCILIATION:  '/reconciliation',
  TRANSFORMATIONS: '/transformations',
  REPORTS:         '/reports',
  HISTORY:         '/imports/history',
  SETTINGS:        '/settings',
});

export const buildDatasetDetailPath = (datasetId) => `/datasets/${datasetId}`;