import mockActivity from '@/data/fixtures/activity.json';
import mockHistory from '@/data/fixtures/importHistory.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const historyService = {
  async getRecentActivity(limit = 5) {
    await delay(600);
    const sorted = [...mockActivity].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    return sorted.slice(0, limit);
  },

  async getHistory() {
    await delay(400);
    return [...mockHistory].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
};