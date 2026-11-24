/**
 * Formats a number with commas (e.g., 14520 -> 14,520)
 */
export function formatNumber(value) {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Formats an ISO date string into a readable format (e.g., Oct 26, 11:45 AM)
 */
export function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}