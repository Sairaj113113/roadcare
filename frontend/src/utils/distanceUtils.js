/**
 * Haversine distance between two coordinates (in km).
 */
export const calculateDistanceKm = (lat1, lng1, lat2, lng2) => {
  const R    = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a    =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const toRad = (deg) => (deg * Math.PI) / 180;

/**
 * Format a distance value for display.
 * < 1 km  → "450 m"
 * >= 1 km → "2.3 km"
 */
export const formatDistance = (km) => {
  if (km == null) return '—';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
};

/**
 * Check if a point is within a radius of a center coordinate.
 */
export const isWithinRadius = (centerLat, centerLng, pointLat, pointLng, radiusKm) => {
  return calculateDistanceKm(centerLat, centerLng, pointLat, pointLng) <= radiusKm;
};