package com.roadcare.entity.enums;

/**
 * Defines the roles available in the RoadCare system.
 *
 * USER         - Regular citizen who can submit and track reports
 * ADMIN        - City-level administrator who manages reports
 * SUPER_ADMIN  - Controls all admins and all cities
 */

public enum UserRole {

    USER,

    ADMIN,

    SUPER_ADMIN
}