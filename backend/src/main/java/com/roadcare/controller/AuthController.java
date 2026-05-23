package com.roadcare.controller;

import com.roadcare.dto.auth.GoogleAuthRequestDTO;

import com.roadcare.dto.auth.LoginRequestDTO;

import com.roadcare.dto.auth.LoginResponseDTO;

import com.roadcare.dto.auth.RegisterRequestDTO;

import com.roadcare.dto.auth.SendOtpRequestDTO;

import com.roadcare.dto.auth.VerifyOtpRequestDTO;

import com.roadcare.service.AuthService;

import com.roadcare.service.OtpService;

import io.swagger.v3.oas.annotations.Operation;

import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;

/**
 * REST controller for authentication endpoints.
 */

@RestController
@RequestMapping("/api/auth")

@RequiredArgsConstructor
@Slf4j

@Tag(
        name = "Authentication",
        description =
                "User registration and login APIs"
)

public class AuthController {

    private final AuthService
            authService;

    private final OtpService
            otpService;

    // =========================================================
    // SEND OTP
    // =========================================================

    @PostMapping("/send-otp")

    @Operation(
            summary = "Send OTP",
            description =
                    "Sends OTP to email for verification."
    )

    public ResponseEntity<String>
    sendOtp(

            @Valid
            @RequestBody
            SendOtpRequestDTO request
    ) {

        log.info(
                "OTP send request for email: {}",
                request.getEmail()
        );

        otpService.sendOtp(
                request.getEmail()
        );

        return ResponseEntity.ok(
                "OTP sent successfully"
        );
    }

    // =========================================================
    // VERIFY OTP
    // =========================================================

    @PostMapping("/verify-otp")

    @Operation(
            summary = "Verify OTP",
            description =
                    "Verifies email OTP."
    )

    public ResponseEntity<String>
    verifyOtp(

            @Valid
            @RequestBody
            VerifyOtpRequestDTO request
    ) {

        log.info(
                "OTP verification request for email: {}",
                request.getEmail()
        );

        otpService.verifyOtp(
                request.getEmail(),
                request.getOtp()
        );

        return ResponseEntity.ok(
                "OTP verified successfully"
        );
    }

    // =========================================================
    // REGISTER
    // =========================================================

    @PostMapping("/register")

    @Operation(
            summary = "Register user",
            description =
                    "Creates a verified USER account and returns JWT."
    )

    public ResponseEntity<LoginResponseDTO>
    register(

            @Valid
            @RequestBody
            RegisterRequestDTO request
    ) {

        log.info(
                "Registration request received for email: {}",
                request.getEmail()
        );

        LoginResponseDTO response =
                authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================================================
    // LOGIN
    // =========================================================

    @PostMapping("/login")

    @Operation(
            summary = "Login user",
            description =
                    "Authenticates credentials and returns JWT token."
    )

    public ResponseEntity<LoginResponseDTO>
    login(

            @Valid
            @RequestBody
            LoginRequestDTO request
    ) {

        log.info(
                "Login request received for email: {}",
                request.getEmail()
        );

        LoginResponseDTO response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GOOGLE LOGIN
    // =========================================================

    @PostMapping("/google")

    @Operation(
            summary = "Google Login",
            description =
                    "Login or register using Google account."
    )

    public ResponseEntity<LoginResponseDTO>
    googleLogin(

            @RequestBody
            GoogleAuthRequestDTO request
    ) {

        log.info(
                "Google login request for email: {}",
                request.getEmail()
        );

        LoginResponseDTO response =
                authService.googleLogin(
                        request.getName(),
                        request.getEmail()
                );

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // CURRENT USER
    // =========================================================

    @GetMapping("/me")

    @Operation(
            summary = "Get current user",
            description =
                    "Returns authenticated user's profile."
    )

    public ResponseEntity<LoginResponseDTO>
    getCurrentUser(

            @AuthenticationPrincipal
            UserDetails userDetails
    ) {

        LoginResponseDTO response =
                authService.getCurrentUser(
                        userDetails.getUsername()
                );

        return ResponseEntity.ok(response);
    }
}