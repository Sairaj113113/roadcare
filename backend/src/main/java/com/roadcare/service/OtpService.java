package com.roadcare.service;

import com.roadcare.entity.EmailVerification;

import com.roadcare.repository.EmailVerificationRepository;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import java.util.Random;

/**
 * Service for handling
 * email OTP verification flow.
 */

@Service
@RequiredArgsConstructor
@Slf4j

public class OtpService {

    private final EmailVerificationRepository
            emailVerificationRepository;

    private final EmailService
            emailService;

    // =====================================================
    // OTP EXPIRY
    // =====================================================

    private static final int
            OTP_EXPIRY_MINUTES = 5;

    // =====================================================
    // SEND OTP
    // =====================================================

    @Transactional
    public void sendOtp(String email) {

        // delete existing OTP if exists

        emailVerificationRepository
                .findByEmail(email)
                .ifPresent(existing ->

                        emailVerificationRepository
                                .delete(existing)
                );

        // generate new OTP

        String otp = generateOtp();

        // save verification

        EmailVerification verification =
                EmailVerification.builder()

                        .email(email)

                        .otp(otp)

                        .verified(false)

                        .expiresAt(
                                LocalDateTime.now()
                                        .plusMinutes(
                                                OTP_EXPIRY_MINUTES
                                        )
                        )

                        .build();

        emailVerificationRepository
                .save(verification);

        // send email

        sendOtpEmail(email, otp);

        log.info(
                "OTP sent successfully to {}",
                email
        );
    }

    // =====================================================
    // VERIFY OTP
    // =====================================================

    @Transactional
    public boolean verifyOtp(
            String email,
            String otp
    ) {

        EmailVerification verification =

                emailVerificationRepository
                        .findByEmail(email)

                        .orElseThrow(() ->

                                new RuntimeException(
                                        "OTP not found"
                                )
                        );

        // already verified

        if (verification.isVerified()) {

            throw new RuntimeException(
                    "Email already verified"
            );
        }

        // expired

        if (
                verification.getExpiresAt()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

            throw new RuntimeException(
                    "OTP expired"
            );
        }

        // invalid otp

        if (
                !verification.getOtp()
                        .equals(otp)
        ) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        // verified success

        verification.setVerified(true);

        emailVerificationRepository
                .save(verification);

        log.info(
                "OTP verified successfully for {}",
                email
        );

        return true;
    }

    // =====================================================
    // CHECK VERIFIED
    // =====================================================

    public boolean isEmailVerified(
            String email
    ) {

        return emailVerificationRepository
                .findByEmail(email)

                .map(
                        EmailVerification::isVerified
                )

                .orElse(false);
    }

    // =====================================================
    // REMOVE VERIFICATION
    // =====================================================

    @Transactional
    public void removeVerification(
            String email
    ) {

        emailVerificationRepository
                .deleteByEmail(email);
    }

    // =====================================================
    // GENERATE OTP
    // =====================================================

    private String generateOtp() {

        Random random = new Random();

        int otp =
                100000 +
                random.nextInt(900000);

        return String.valueOf(otp);
    }

    // =====================================================
    // SEND OTP EMAIL
    // =====================================================

    private void sendOtpEmail(
            String toEmail,
            String otp
    ) {

        try {

            String subject =
                    "RoadCare Email Verification OTP";

            String body = """
                    <html>
                    <body style="
                        font-family: Arial, sans-serif;
                        background:#f4f4f4;
                        padding:20px;
                    ">

                      <div style="
                          max-width:600px;
                          margin:auto;
                          background:#fff;
                          border-radius:10px;
                          padding:30px;
                          box-shadow:0 2px 8px rgba(0,0,0,0.1);
                      ">

                        <h2 style="color:#2563EB;">
                          🔐 Verify Your Email
                        </h2>

                        <p>
                          Your RoadCare verification OTP is:
                        </p>

                        <div style="
                            margin:25px 0;
                            text-align:center;
                        ">

                          <span style="
                              display:inline-block;
                              font-size:36px;
                              font-weight:bold;
                              letter-spacing:8px;
                              color:#111827;
                              background:#EFF6FF;
                              padding:18px 30px;
                              border-radius:12px;
                          ">
                            %s
                          </span>

                        </div>

                        <p style="color:#555;">
                          This OTP will expire in
                          %d minutes.
                        </p>

                        <p style="
                            color:#999;
                            font-size:12px;
                            margin-top:30px;
                        ">
                          If you did not request this,
                          please ignore this email.
                        </p>

                      </div>

                    </body>
                    </html>
                    """.formatted(
                    otp,
                    OTP_EXPIRY_MINUTES
            );

           emailService.sendHtmlEmail(
        toEmail,
        subject,
        body
);

        } catch (Exception ex) {

            log.error(
                    "Failed to send OTP email: {}",
                    ex.getMessage()
            );

            throw new RuntimeException(
                    "Failed to send OTP email"
            );
        }
    }
}