import mockDatasets from '@/data/fixtures/datasets.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let datasetsDB = [...mockDatasets];

export const datasetService = {
  async getAll() {
    await delay(300);
    return [...datasetsDB];
  },

  async createDataset(datasetData) {
    await delay(500);
    const newDataset = {
      id: `ds-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      ...datasetData
    };
    // Prepend so it shows at the top
    datasetsDB = [newDataset, ...datasetsDB];
    return newDataset;
  },

  async deleteDataset(id) {
    await delay(200);
    datasetsDB = datasetsDB.filter((ds) => ds.id !== id);
    return true;
  },

  async renameDataset(id, newName) {
    await delay(200);
    datasetsDB = datasetsDB.map((ds) =>
      ds.id === id ? { ...ds, name: newName } : ds
    );
    return true;
  },

  async getDashboardMetrics() {
    await delay(400);
    const totalDatasets = datasetsDB.length;
    const totalRecords = datasetsDB.reduce((sum, ds) => sum + ds.recordCount, 0);
    const successfulImports = datasetsDB.filter((ds) => ds.status === 'completed').length;
    const failedImports = datasetsDB.filter((ds) => ds.status === 'failed').length;
    const validationErrors = datasetsDB.reduce((sum, ds) => sum + ds.errorCount, 0);

    return {
      totalDatasets,
      totalRecords,
      successfulImports,
      failedImports,
      validationErrors,
    };
  },
};