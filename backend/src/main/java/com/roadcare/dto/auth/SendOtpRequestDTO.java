package com.roadcare.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO for sending OTP
 * during registration.
 */

@Getter
@Setter

public class SendOtpRequestDTO {

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
}