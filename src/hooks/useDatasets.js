import { useState, useEffect, useCallback } from 'react';
import { datasetService } from '@/services/mock/datasetService.js';

export function useDatasets() {
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDatasets = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await datasetService.getAll();
      setDatasets(data);
      setError(null);
    } catch (err) {
      setError('Failed to load datasets.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  const deleteDataset = async (id) => {
    await datasetService.deleteDataset(id);
    setDatasets((prev) => prev.filter((ds) => ds.id !== id));
  };

  const renameDataset = async (id, newName) => {
    await datasetService.renameDataset(id, newName);
    setDatasets((prev) =>
      prev.map((ds) => (ds.id === id ? { ...ds, name: newName } : ds))
    );
  };

  return { datasets, isLoading, error, deleteDataset, renameDataset, refresh: fetchDatasets };
}