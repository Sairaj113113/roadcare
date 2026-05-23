package com.roadcare.util;

/**
 * Utility class for geographic coordinate validation and formatting.
 * Used by ReportService to validate incoming report location data.
 * All methods are static — this class is never instantiated.
 */
public final class LocationUtils {

    private LocationUtils() {
        // Utility class — no instantiation
    }

    // Valid coordinate ranges
    private static final double MIN_LATITUDE  = -90.0;
    private static final double MAX_LATITUDE  =  90.0;
    private static final double MIN_LONGITUDE = -180.0;
    private static final double MAX_LONGITUDE =  180.0;

    /**
     * Validate that a latitude value is within the valid geographic range [-90, 90].
     *
     * @param latitude The latitude to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidLatitude(Double latitude) {
        return latitude != null
                && latitude >= MIN_LATITUDE
                && latitude <= MAX_LATITUDE;
    }

    /**
     * Validate that a longitude value is within the valid geographic range [-180, 180].
     *
     * @param longitude The longitude to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidLongitude(Double longitude) {
        return longitude != null
                && longitude >= MIN_LONGITUDE
                && longitude <= MAX_LONGITUDE;
    }

    /**
     * Validate that both latitude and longitude are valid geographic coordinates.
     *
     * @param latitude  The latitude to validate
     * @param longitude The longitude to validate
     * @return true if both are valid, false otherwise
     */
    public static boolean areValidCoordinates(Double latitude, Double longitude) {
        return isValidLatitude(latitude) && isValidLongitude(longitude);
    }

    /**
     * Validate coordinates and throw IllegalArgumentException if invalid.
     * Use this in service layer for early input rejection.
     *
     * @param latitude  The latitude to validate
     * @param longitude The longitude to validate
     * @throws IllegalArgumentException if either coordinate is out of range
     */
    public static void validateCoordinatesOrThrow(Double latitude, Double longitude) {
        if (!isValidLatitude(latitude)) {
            throw new IllegalArgumentException(
                "Invalid latitude: " + latitude + ". Must be between -90 and 90.");
        }
        if (!isValidLongitude(longitude)) {
            throw new IllegalArgumentException(
                "Invalid longitude: " + longitude + ". Must be between -180 and 180.");
        }
    }

    /**
     * Format coordinates into a human-readable string for logging.
     *
     * @param latitude  Latitude value
     * @param longitude Longitude value
     * @return Formatted string: "(lat, lng)"
     */
    public static String formatCoordinates(Double latitude, Double longitude) {
        return String.format("(%.6f, %.6f)", latitude, longitude);
    }
}