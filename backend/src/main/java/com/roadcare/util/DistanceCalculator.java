package com.roadcare.util;

/**
 * Utility class for calculating geographic distances between coordinates.
 * Uses the Haversine formula which accounts for the Earth's curvature.
 * Used by ReportService for duplicate detection and nearby pothole search.
 * All methods are static — this class is never instantiated.
 */
public final class DistanceCalculator {

    private DistanceCalculator() {
        // Utility class — no instantiation
    }

    /** Earth's mean radius in kilometres. */
    private static final double EARTH_RADIUS_KM = 6371.0;

    /**
     * Calculate the great-circle distance between two geographic coordinates
     * using the Haversine formula.
     *
     * @param lat1 Latitude of point 1 (degrees)
     * @param lng1 Longitude of point 1 (degrees)
     * @param lat2 Latitude of point 2 (degrees)
     * @param lng2 Longitude of point 2 (degrees)
     * @return Distance in kilometres between the two points
     */
    public static double calculateDistanceKm(double lat1, double lng1,
                                              double lat2, double lng2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                 + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                 * Math.sin(dLng / 2) * Math.sin(dLng / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_KM * c;
    }

    /**
     * Check whether a given point lies within a specified radius of a center point.
     *
     * @param centerLat  Latitude of the center point (degrees)
     * @param centerLng  Longitude of the center point (degrees)
     * @param pointLat   Latitude of the point to check (degrees)
     * @param pointLng   Longitude of the point to check (degrees)
     * @param radiusKm   Radius threshold in kilometres
     * @return true if the point is within the radius, false otherwise
     */
    public static boolean isWithinRadius(double centerLat, double centerLng,
                                          double pointLat, double pointLng,
                                          double radiusKm) {
        double distance = calculateDistanceKm(centerLat, centerLng, pointLat, pointLng);
        return distance <= radiusKm;
    }

    /**
     * Convert kilometres to metres.
     *
     * @param km Distance in kilometres
     * @return Distance in metres
     */
    public static double kmToMetres(double km) {
        return km * 1000.0;
    }
}