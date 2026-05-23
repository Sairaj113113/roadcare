package com.roadcare.util;

/**
 * Constants related to JWT token configuration and claims in RoadCare.
 * Referenced by JwtUtil (Prompt 2) to ensure consistent key names
 * across token generation and validation.
 * All fields are static final — this class is never instantiated.
 */
public final class JwtConstants {

    private JwtConstants() {
        // Utility class — no instantiation
    }

    // ==================== SPRING PROPERTY KEYS ====================
    // These match the keys defined in application.properties exactly.
    public static final String JWT_SECRET_PROPERTY      = "app.jwt.secret";
    public static final String JWT_EXPIRY_PROPERTY      = "app.jwt.expiration-ms";

    // ==================== JWT CLAIMS ====================
    // Claim keys embedded inside the JWT payload.
    public static final String CLAIM_ROLE               = "role";
    public static final String CLAIM_USER_ID            = "userId";
    public static final String CLAIM_EMAIL              = "email";

    // ==================== TOKEN DEFAULTS ====================
    /** Default token validity: 24 hours in milliseconds. */
    public static final long   DEFAULT_EXPIRY_MS        = 86_400_000L;

    // ==================== HEADER ====================
    public static final String TOKEN_HEADER             = "Authorization";
    public static final String TOKEN_PREFIX             = "Bearer ";
    public static final int    TOKEN_PREFIX_LENGTH      = 7;
}