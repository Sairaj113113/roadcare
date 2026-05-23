package com.roadcare.util;

/**
 * Application-wide constants for RoadCare.
 * Centralises magic values to avoid hardcoding across the codebase.
 * All fields are static final — this class is never instantiated.
 */
public final class AppConstants {

    private AppConstants() {
        // Utility class — no instantiation
    }

    // ==================== API BASE PATH ====================
    public static final String API_BASE_PATH = "/api";

    // ==================== AUTH ====================
    public static final String AUTH_HEADER         = "Authorization";
    public static final String BEARER_PREFIX        = "Bearer ";
    public static final String ROLE_USER            = "ROLE_USER";
    public static final String ROLE_ADMIN           = "ROLE_ADMIN";

    // ==================== DUPLICATE DETECTION ====================
    /**
     * Radius in kilometres within which two reports are considered duplicates.
     * A 50-metre radius is used to group reports of the same physical pothole.
     */
   public static final double DUPLICATE_RADIUS_KM = 0.05;

    /**
     * Radius in kilometres for the "nearby potholes" map feature.
     * Shows all potholes within 5 km of the user's current location.
     */
    public static final double NEARBY_RADIUS_KM     = 5.0;

    // ==================== CLOUDINARY ====================
    public static final String CLOUDINARY_FOLDER    = "roadcare/potholes";

    // ==================== PAGINATION ====================
    public static final int DEFAULT_PAGE_SIZE       = 20;
    public static final int MAX_PAGE_SIZE           = 100;

    // ==================== EMAIL ====================
    public static final String EMAIL_STATUS_UPDATE_SUBJECT = "RoadCare — Your Report Status Has Been Updated";
    public static final String EMAIL_REPORT_RECEIVED_SUBJECT = "RoadCare — Report Received Successfully";

    // ==================== NOTIFICATION MESSAGES ====================
    public static final String NOTIF_TITLE_PENDING      = "Report Submitted";
    public static final String NOTIF_TITLE_IN_PROGRESS  = "Repair In Progress";
    public static final String NOTIF_TITLE_RESOLVED     = "Pothole Resolved";
}