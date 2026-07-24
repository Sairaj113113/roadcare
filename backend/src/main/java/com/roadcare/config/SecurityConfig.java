package com.roadcare.config;

import com.roadcare.security.CustomUserDetailsService;
import com.roadcare.security.JwtAuthenticationEntryPoint;
import com.roadcare.security.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Spring Security configuration for RoadCare.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // ================= CORS =================

                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))

                // ================= DISABLE CSRF =================

                .csrf(AbstractHttpConfigurer::disable)

                // ================= DISABLE FORM LOGIN =================

                .formLogin(AbstractHttpConfigurer::disable)

                // ================= DISABLE BASIC AUTH =================

                .httpBasic(AbstractHttpConfigurer::disable)

                // ================= STATELESS SESSION =================

                .sessionManagement(session ->

                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // ================= JWT ENTRY =================

                .exceptionHandling(ex ->

                        ex.authenticationEntryPoint(
                                jwtAuthenticationEntryPoint
                        )
                )

                // =====================================================
                // AUTHORIZATION
                // =====================================================

                .authorizeHttpRequests(auth -> auth

                        // ================= PUBLIC AUTH =================

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        // ================= ADMIN LOGIN =================

                        .requestMatchers(
                                "/api/admin/login"
                        ).permitAll()

                        // ================= PUBLIC MAP =================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/map/**"
                        ).permitAll()

                        // ================= PUBLIC REPORTS =================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/reports/nearby"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/reports/stats"
                        ).permitAll()

                        // ================= SWAGGER =================

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/api-docs/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // =====================================================
                        // SUPER ADMIN ONLY
                        // =====================================================

                        .requestMatchers(
                                "/api/super-admin/**"
                        ).hasRole("SUPER_ADMIN")

                        // =====================================================
                        // ADMIN + SUPER ADMIN
                        // =====================================================

                        .requestMatchers(
                                "/api/admin/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // =====================================================
                        // USER + ADMIN + SUPER ADMIN
                        // =====================================================

                        .requestMatchers(
                                "/api/reports/**"
                        ).hasAnyRole(
                                "USER",
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        .requestMatchers(
                                "/api/notifications/**"
                        ).hasAnyRole(
                                "USER",
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // ================= EVERYTHING ELSE =================

                        .anyRequest().authenticated()
                )

                // ================= AUTH PROVIDER =================

                .authenticationProvider(
                        authenticationProvider()
                )

                // ================= JWT FILTER =================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    // =========================================================
    // CORS CONFIG
    // =========================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config =
                new CorsConfiguration();

      config.setAllowedOrigins(List.of(
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://roadcare-plum.vercel.app"
));

        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        config.setAllowedHeaders(List.of("*"));

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return source;
    }

    // =========================================================
    // AUTH PROVIDER
    // =========================================================

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();

        provider.setUserDetailsService(
                userDetailsService
        );

        provider.setPasswordEncoder(
                passwordEncoder()
        );

        return provider;
    }

    // =========================================================
    // PASSWORD ENCODER
    // =========================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // =========================================================
    // AUTH MANAGER
    // =========================================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }
}