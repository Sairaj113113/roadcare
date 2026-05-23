package com.roadcare.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO for OTP verification.
 */

@Getter
@Setter

public class VerifyOtpRequestDTO {

    // =====================================================
    // EMAIL
    // =====================================================

    @Email(
            message = "Invalid email"
    )
    @NotBlank(
            message = "Email is required"
    )
    private String email;

    // =====================================================
    // OTP
    // =====================================================

    @NotBlank(
            message = "OTP is required"
    )
    private String otp;
}