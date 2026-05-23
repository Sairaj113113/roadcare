package com.roadcare.entity.enums;

/**
 * Represents the lifecycle status of a pothole complaint report.
 * PENDING     - Report submitted, awaiting admin review.
 * IN_PROGRESS - Admin has acknowledged and repair is underway.
 * RESOLVED    - Pothole has been repaired and complaint is closed.
 */
public enum ReportStatus {
    PENDING,
    IN_PROGRESS,
    RESOLVED
}