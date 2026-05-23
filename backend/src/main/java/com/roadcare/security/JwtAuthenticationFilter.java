package com.roadcare.security;

import com.roadcare.util.JwtConstants;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT authentication filter that runs once per HTTP request.
 * Extracts the Bearer token from the Authorization header,
 * validates it using JwtUtil, loads the user, and sets
 * the authentication in the Spring Security context.
 *
 * Requests without a valid token proceed unauthenticated —
 * SecurityConfig determines which endpoints require authentication.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String token = extractTokenFromRequest(request);

        // No token present — skip JWT processing, let SecurityConfig handle access
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // Token present but structurally invalid — skip, security will reject
        if (!jwtUtil.isTokenStructureValid(token)) {
            log.warn("Invalid JWT token received for request: {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        // Only set authentication if not already authenticated in this request
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                String email = jwtUtil.extractEmail(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (jwtUtil.isTokenValid(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.debug("JWT authentication set for user: {}", email);
                }

            } catch (Exception ex) {
                log.warn("JWT authentication failed for request {}: {}", request.getRequestURI(), ex.getMessage());
                // Don't rethrow — let the request proceed unauthenticated
                // SecurityConfig will reject it if the endpoint requires auth
            }
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Extracts the JWT token from the Authorization header.
     * Expected format: "Bearer <token>"
     *
     * @return raw token string, or null if header is absent/malformed
     */
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(JwtConstants.TOKEN_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(JwtConstants.TOKEN_PREFIX)) {
            return bearerToken.substring(JwtConstants.TOKEN_PREFIX_LENGTH);
        }
        return null;
    }
}