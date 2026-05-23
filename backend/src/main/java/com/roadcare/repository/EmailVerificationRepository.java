package com.roadcare.repository;

import com.roadcare.entity.EmailVerification;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for email OTP verification records.
 */

@Repository
public interface EmailVerificationRepository
        extends JpaRepository<EmailVerification, Long> {

    // =====================================================
    // FIND BY EMAIL
    // =====================================================

    Optional<EmailVerification>
    findByEmail(String email);

    // =====================================================
    // DELETE BY EMAIL
    // =====================================================

    void deleteByEmail(String email);
}