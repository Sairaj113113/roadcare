package com.roadcare.service;

import com.roadcare.dto.auth.LoginRequestDTO;

import com.roadcare.dto.auth.LoginResponseDTO;

import com.roadcare.dto.auth.RegisterRequestDTO;

import com.roadcare.entity.User;

import com.roadcare.entity.enums.UserRole;

import com.roadcare.exception.UnauthorizedException;

import com.roadcare.repository.UserRepository;

import com.roadcare.security.JwtUtil;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.BadCredentialsException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

/**
 * Authentication service.
 */

@Service
@RequiredArgsConstructor
@Slf4j

public class AuthService {

    private final UserRepository
            userRepository;

    private final PasswordEncoder
            passwordEncoder;

    private final JwtUtil
            jwtUtil;

    private final AuthenticationManager
            authenticationManager;

    private final OtpService
            otpService;

    // =========================================================
    // REGISTER
    // =========================================================

    @Transactional
    public LoginResponseDTO register(
            RegisterRequestDTO request
    ) {

        String cleanEmail =

                request.getEmail()
                        .toLowerCase()
                        .trim();

        // =====================================================
        // CHECK DUPLICATE
        // =====================================================

        if (
                userRepository.existsByEmail(
                        cleanEmail
                )
        ) {

            log.warn(
                    "Registration attempt with existing email: {}",
                    cleanEmail
            );

            throw new IllegalArgumentException(
                    "An account with this email already exists."
            );
        }

        // =====================================================
        // VERIFY EMAIL VERIFIED
        // =====================================================

        if (
                !otpService.isEmailVerified(
                        cleanEmail
                )
        ) {

            throw new RuntimeException(
                    "Please verify your email OTP before registration."
            );
        }

        // =====================================================
        // CREATE USER
        // =====================================================

        User user = User.builder()

                .name(
                        request.getName()
                                .trim()
                )

                .email(cleanEmail)

                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )

                .role(UserRole.USER)

                .build();

        User savedUser =
                userRepository.save(user);

        log.info(
                "New user registered: {} (id={})",
                savedUser.getEmail(),
                savedUser.getId()
        );

        // =====================================================
        // REMOVE OTP RECORD
        // =====================================================

        otpService.removeVerification(
                cleanEmail
        );

        // =====================================================
        // GENERATE JWT
        // =====================================================

        String token =
                jwtUtil.generateToken(
                        savedUser.getEmail(),
                        savedUser.getRole().name(),
                        savedUser.getId(),
                        savedUser.getAssignedCity()
                );

        return buildLoginResponse(
                savedUser,
                token
        );
    }

    // =========================================================
    // LOGIN
    // =========================================================

    @Transactional(readOnly = true)
    public LoginResponseDTO login(
            LoginRequestDTO request
    ) {

        try {

            authenticationManager.authenticate(

                    new UsernamePasswordAuthenticationToken(

                            request.getEmail()
                                    .toLowerCase()
                                    .trim(),

                            request.getPassword()
                    )
            );

        } catch (BadCredentialsException ex) {

            log.warn(
                    "Failed login attempt for email: {}",
                    request.getEmail()
            );

            throw new BadCredentialsException(
                    "Invalid email or password."
            );
        }

        User user =

                userRepository.findByEmail(

                                request.getEmail()
                                        .toLowerCase()
                                        .trim()
                        )

                        .orElseThrow(() ->

                                new BadCredentialsException(
                                        "Invalid email or password."
                                )
                        );

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole().name(),
                        user.getId(),
                        user.getAssignedCity()
                );

        log.info(
                "User logged in: {} (role={})",
                user.getEmail(),
                user.getRole()
        );

        return buildLoginResponse(
                user,
                token
        );
    }

    // =========================================================
    // GOOGLE LOGIN
    // =========================================================

    @Transactional
    public LoginResponseDTO googleLogin(
            String name,
            String email
    ) {

        String cleanEmail =
                email.toLowerCase().trim();

        User user =

                userRepository.findByEmail(
                                cleanEmail
                        )
                        .orElse(null);

        // =====================================================
        // CREATE GOOGLE USER
        // =====================================================

        if (user == null) {

            user = User.builder()

                    .name(name)

                    .email(cleanEmail)

                    .password(
                            passwordEncoder.encode(
                                    "GOOGLE_AUTH_USER"
                            )
                    )

                    .role(UserRole.USER)

                    .build();

            user =
                    userRepository.save(user);

            log.info(
                    "New Google user created: {}",
                    user.getEmail()
            );
        }

        // =====================================================
        // BLOCK ADMIN GOOGLE LOGIN
        // =====================================================

        if (
                user.getRole() == UserRole.ADMIN ||
                user.getRole() == UserRole.SUPER_ADMIN
        ) {

            throw new UnauthorizedException(
                    "Admins must login using email and password."
            );
        }

        // =====================================================
        // GENERATE JWT
        // =====================================================

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole().name(),
                        user.getId(),
                        user.getAssignedCity()
                );

        log.info(
                "Google login success: {}",
                user.getEmail()
        );

        return buildLoginResponse(
                user,
                token
        );
    }

    // =========================================================
    // ADMIN LOGIN
    // =========================================================

    @Transactional(readOnly = true)
    public LoginResponseDTO adminLogin(
            LoginRequestDTO request
    ) {

        try {

            authenticationManager.authenticate(

                    new UsernamePasswordAuthenticationToken(

                            request.getEmail()
                                    .toLowerCase()
                                    .trim(),

                            request.getPassword()
                    )
            );

        } catch (BadCredentialsException ex) {

            log.warn(
                    "Failed admin login attempt for email: {}",
                    request.getEmail()
            );

            throw new BadCredentialsException(
                    "Invalid email or password."
            );
        }

        User admin =

                userRepository.findByEmail(

                                request.getEmail()
                                        .toLowerCase()
                                        .trim()
                        )

                        .orElseThrow(() ->

                                new UnauthorizedException(
                                        "Admin account not found."
                                )
                        );

        // =====================================================
        // ROLE CHECK
        // =====================================================

        if (
                admin.getRole() != UserRole.ADMIN &&
                admin.getRole() != UserRole.SUPER_ADMIN
        ) {

            throw new UnauthorizedException(
                    "Access denied."
            );
        }

        // =====================================================
        // GENERATE TOKEN
        // =====================================================

        String token =
                jwtUtil.generateToken(
                        admin.getEmail(),
                        admin.getRole().name(),
                        admin.getId(),
                        admin.getAssignedCity()
                );

        log.info(
                "Admin logged in: {}",
                admin.getEmail()
        );

        return buildLoginResponse(
                admin,
                token
        );
    }

    // =========================================================
    // CURRENT USER
    // =========================================================

    @Transactional(readOnly = true)
    public LoginResponseDTO getCurrentUser(
            String email
    ) {

        User user =

                userRepository.findByEmail(email)

                        .orElseThrow(() ->

                                new UnauthorizedException(
                                        "User session invalid."
                                )
                        );

        return buildLoginResponse(
                user,
                null
        );
    }

    // =========================================================
    // BUILD RESPONSE
    // =========================================================

    private LoginResponseDTO buildLoginResponse(
            User user,
            String token
    ) {

        return LoginResponseDTO.builder()

                .token(token)

                .userId(user.getId())

                .name(user.getName())

                .email(user.getEmail())

                .role(user.getRole().name())

                .assignedCity(
                        user.getAssignedCity()
                )

                .build();
    }
}