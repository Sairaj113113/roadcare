/**
 * Format an ISO date string into a human-readable date.
 * Example: "2026-05-13T10:30:00" → "13 May 2026"
 */
export const formatDate = (isoString) => {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleDateString('en-IN', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  });
};

/**
 * Format an ISO date string into date + time.
 * Example: "2026-05-13T10:30:00" → "13 May 2026, 10:30 AM"
 */
export const formatDateTime = (isoString) => {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleString('en-IN', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Return a relative time string.
 * Example: "2 hours ago", "3 days ago", "just now"
 */
export const timeAgo = (isoString) => {
  if (!isoString) return '—';
  const seconds = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (seconds < 60)   return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return formatDate(isoString);
};