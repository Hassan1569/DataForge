/**
 * API Client Configuration
 * 
 * Currently, this app runs on mock data (see src/services/mock/).
 * When you are ready to connect a real backend (e.g., Laravel), you will:
 * 1. Update the base URL in your .env.local file.
 * 2. Replace the mock service calls in your custom hooks (e.g., useDatasets.js)
 *    with actual fetch/axios calls to this client.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },
  // post, put, delete methods would go here
};