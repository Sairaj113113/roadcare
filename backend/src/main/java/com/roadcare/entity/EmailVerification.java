package com.roadcare.entity;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

/**
 * Stores OTP verification data
 * for email verification during registration.
 */

@Entity
@Table(name = "email_verifications")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
@Builder

public class EmailVerification {

    // =====================================================
    // PRIMARY KEY
    // =====================================================

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    // =====================================================
    // EMAIL
    // =====================================================

    @Column(
            nullable = false,
            unique = true,
            length = 255
    )
    private String email;

    // =====================================================
    // OTP
    // =====================================================

    @Column(
            nullable = false,
            length = 10
    )
    private String otp;

    // =====================================================
    // EXPIRY TIME
    // =====================================================

    @Column(
            name = "expires_at",
            nullable = false
    )
    private LocalDateTime expiresAt;

    // =====================================================
    // VERIFIED STATUS
    // =====================================================

    @Column(nullable = false)
    private boolean verified;

    // =====================================================
    // CREATED TIME
    // =====================================================

    @Column(
            name = "created_at",
            nullable = false
    )
    private LocalDateTime createdAt;

    // =====================================================
    // AUTO TIMESTAMP
    // =====================================================

    @PrePersist
    public void prePersist() {

        this.createdAt =
                LocalDateTime.now();

        if (this.verified == false) {

            this.verified = false;
        }
    }
}