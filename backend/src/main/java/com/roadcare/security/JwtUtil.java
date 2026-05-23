package com.roadcare.security;

import com.roadcare.util.JwtConstants;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Utility class for JWT token operations in RoadCare.
 * Handles token generation, validation, and claim extraction.
 * Uses HMAC-SHA256 signing with a configurable secret from application.properties.
 */
@Component
@Slf4j
public class JwtUtil {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private long jwtExpirationMs;

    // ==================== TOKEN GENERATION ====================

    /**
     * Generate a JWT token for a user with:
     * - role
     * - userId
     * - email
     * - assignedCity
     */
    public String generateToken(
            String email,
            String role,
            Long userId,
            String assignedCity
    ) {

        Map<String, Object> claims = new HashMap<>();

        claims.put(JwtConstants.CLAIM_ROLE, role);

        claims.put(JwtConstants.CLAIM_USER_ID, userId);

        claims.put(JwtConstants.CLAIM_EMAIL, email);

        claims.put("assignedCity", assignedCity);

        return buildToken(claims, email);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            String subject
    ) {

        return Jwts.builder()

                .setClaims(extraClaims)

                .setSubject(subject)

                .setIssuedAt(
                        new Date(System.currentTimeMillis())
                )

                .setExpiration(
                        new Date(System.currentTimeMillis() + jwtExpirationMs)
                )

                .signWith(
                        getSigningKey(),
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    // ==================== TOKEN VALIDATION ====================

    /**
     * Validate token against UserDetails.
     */
    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        final String email = extractEmail(token);

        return email.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    /**
     * Validate JWT structure and signature.
     */
    public boolean isTokenStructureValid(String token) {

        try {

            Jwts.parserBuilder()

                    .setSigningKey(getSigningKey())

                    .build()

                    .parseClaimsJws(token);

            return true;

        } catch (MalformedJwtException ex) {

            log.warn("Invalid JWT token structure: {}", ex.getMessage());

        } catch (ExpiredJwtException ex) {

            log.warn("JWT token has expired: {}", ex.getMessage());

        } catch (UnsupportedJwtException ex) {

            log.warn("Unsupported JWT token: {}", ex.getMessage());

        } catch (IllegalArgumentException ex) {

            log.warn("JWT claims string is empty: {}", ex.getMessage());
        }

        return false;
    }

    private boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }

    // ==================== CLAIM EXTRACTION ====================

    /**
     * Extract email (subject).
     */
    public String extractEmail(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    /**
     * Extract role claim.
     */
    public String extractRole(String token) {

        return extractClaim(
                token,
                claims -> claims.get(
                        JwtConstants.CLAIM_ROLE,
                        String.class
                )
        );
    }

    /**
     * Extract userId claim.
     */
    public Long extractUserId(String token) {

        return extractClaim(
                token,
                claims -> claims.get(
                        JwtConstants.CLAIM_USER_ID,
                        Long.class
                )
        );
    }

    /**
     * Extract assigned city.
     */
    public String extractAssignedCity(String token) {

        return extractClaim(
                token,
                claims -> claims.get(
                        "assignedCity",
                        String.class
                )
        );
    }

    private Date extractExpiration(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }

    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {

        final Claims claims =
                extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()

                .setSigningKey(getSigningKey())

                .build()

                .parseClaimsJws(token)

                .getBody();
    }

    // ==================== SIGNING KEY ====================

    private Key getSigningKey() {

        byte[] keyBytes =
                Decoders.BASE64.decode(jwtSecret);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}