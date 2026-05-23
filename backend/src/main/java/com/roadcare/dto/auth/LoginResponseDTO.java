package com.roadcare.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Response DTO returned on successful login or registration.
 * Contains the JWT token and essential user details for frontend storage.
 * The frontend stores this in localStorage via tokenUtils.js.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {

    /** JWT Bearer token — must be included in Authorization header for secured APIs. */
    private String token;

    private Long userId;

    private String name;

    private String email;

    /**
     * User role as a plain string:
     * USER
     * ADMIN
     * SUPER_ADMIN
     */
    private String role;

    /**
     * Assigned city for admin accounts.
     * Example:
     *   Hyderabad
     *   Warangal
     *
     * Null for normal users.
     */
    private String assignedCity;
}