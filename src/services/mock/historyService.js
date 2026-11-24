import mockActivity from '@/data/fixtures/activity.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const historyService = {
  async getRecentActivity(limit = 5) {
    await delay(600);
    // Sort descending by timestamp and limit
    const sorted = [...mockActivity].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    return sorted.slice(0, limit);
  }
};