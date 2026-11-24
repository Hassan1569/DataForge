import mockDatasets from '@/data/fixtures/datasets.json';

// Simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const datasetService = {
  async getAll() {
    await delay(400);
    return [...mockDatasets];
  },

  async getDashboardMetrics() {
    await delay(500);
    
    const datasets = [...mockDatasets];
    const totalDatasets = datasets.length;
    const totalRecords = datasets.reduce((sum, ds) => sum + ds.recordCount, 0);
    
    // Counts based on status
    const successfulImports = datasets.filter(ds => ds.status === 'completed').length;
    const failedImports = datasets.filter(ds => ds.status === 'failed').length;
    
    // Total errors across all datasets
    const validationErrors = datasets.reduce((sum, ds) => sum + ds.errorCount, 0);

    return {
      totalDatasets,
      totalRecords,
      successfulImports,
      failedImports,
      validationErrors
    };
  }
};