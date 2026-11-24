import { useState, useEffect } from 'react';
import { datasetService } from '@/services/mock/datasetService.js';
import { historyService } from '@/services/mock/historyService.js';

export function useDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        // Fetch metrics and activity in parallel
        const [metricsData, activityData] = await Promise.all([
          datasetService.getDashboardMetrics(),
          historyService.getRecentActivity(4),
        ]);

        if (isMounted) {
          setMetrics(metricsData);
          setActivity(activityData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load dashboard data. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { metrics, activity, isLoading, error };
}