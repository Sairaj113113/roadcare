package com.roadcare.service;

import com.roadcare.util.AppConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

/**
 * Service for sending email notifications to users in RoadCare.
 * All emails are sent asynchronously to avoid blocking the main request thread.
 * Uses Spring JavaMailSender with SMTP settings from application.properties.
 *
 * Triggered by AdminService whenever a report status changes.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    // ==================== STATUS UPDATE EMAIL ====================

    /**
     * Send a status update email to the report submitter.
     * Called asynchronously after every admin status change.
     *
     * @param toEmail     Recipient email address (the original reporter)
     * @param userName    Recipient's display name
     * @param reportId    The report ID that was updated
     * @param newStatus   The new status value: PENDING, IN_PROGRESS, or RESOLVED
     * @param remarks     Optional admin remarks to include in the email
     */
    @Async
    public void sendStatusUpdateEmail(String toEmail, String userName,
                                       Long reportId, String newStatus, String remarks) {
        try {
            String subject = AppConstants.EMAIL_STATUS_UPDATE_SUBJECT;
            String body    = buildStatusUpdateEmailBody(userName, reportId, newStatus, remarks);
            sendHtmlEmail(toEmail, subject, body);
            log.info("Status update email sent to {} for report #{}", toEmail, reportId);
        } catch (Exception ex) {
            // Email failures must never crash the main status-update flow
            log.error("Failed to send status update email to {}: {}", toEmail, ex.getMessage());
        }
    }

    /**
     * Send a confirmation email when a new report is successfully submitted.
     *
     * @param toEmail   Recipient email address (the new reporter)
     * @param userName  Recipient's display name
     * @param reportId  The newly created report ID
     */
    @Async
    public void sendReportReceivedEmail(String toEmail, String userName, Long reportId) {
        try {
            String subject = AppConstants.EMAIL_REPORT_RECEIVED_SUBJECT;
            String body    = buildReportReceivedEmailBody(userName, reportId);
            sendHtmlEmail(toEmail, subject, body);
            log.info("Report received email sent to {} for report #{}", toEmail, reportId);
        } catch (Exception ex) {
            log.error("Failed to send report received email to {}: {}", toEmail, ex.getMessage());
        }
    }

    // ==================== PRIVATE EMAIL BUILDERS ====================

    public void sendHtmlEmail(String to, String subject, String htmlBody)
            throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true); // true = HTML content
        mailSender.send(message);
    }

    private String buildStatusUpdateEmailBody(String userName, Long reportId,
                                               String newStatus, String remarks) {
        String statusLabel    = getStatusLabel(newStatus);
        String statusColor    = getStatusColor(newStatus);
        String remarksSection = (remarks != null && !remarks.isBlank())
                ? "<p style='color:#555;'><strong>Admin Note:</strong> " + remarks + "</p>"
                : "";

        return """
                <html>
                <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
                  <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px;
                               padding:30px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                    <h2 style="color:#1a73e8;">🚧 RoadCare — Status Update</h2>
                    <p>Dear <strong>%s</strong>,</p>
                    <p>Your pothole report <strong>#%d</strong> has been updated.</p>
                    <div style="background:%s; color:#fff; padding:12px 20px; border-radius:6px;
                                 display:inline-block; font-size:16px; font-weight:bold; margin:10px 0;">
                      %s
                    </div>
                    %s
                    <p style="color:#777; margin-top:20px;">
                      You can track your report at any time by logging into the RoadCare portal.
                    </p>
                    <hr style="border:none; border-top:1px solid #eee; margin:20px 0;"/>
                    <p style="color:#aaa; font-size:12px;">
                      This is an automated message from RoadCare. Please do not reply to this email.
                    </p>
                  </div>
                </body>
                </html>
                """.formatted(userName, reportId, statusColor, statusLabel, remarksSection);
    }

    private String buildReportReceivedEmailBody(String userName, Long reportId) {
        return """
                <html>
                <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
                  <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px;
                               padding:30px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                    <h2 style="color:#1a73e8;">✅ RoadCare — Report Received</h2>
                    <p>Dear <strong>%s</strong>,</p>
                    <p>Thank you for helping improve your city's roads!</p>
                    <p>Your pothole report <strong>#%d</strong> has been successfully submitted
                       and is now <strong>PENDING</strong> review by our road maintenance team.</p>
                    <p style="color:#777;">
                      Our officers will review your report and begin repairs as soon as possible.
                      You will receive email updates whenever the status changes.
                    </p>
                    <hr style="border:none; border-top:1px solid #eee; margin:20px 0;"/>
                    <p style="color:#aaa; font-size:12px;">
                      This is an automated message from RoadCare. Please do not reply to this email.
                    </p>
                  </div>
                </body>
                </html>
                """.formatted(userName, reportId);
    }

    // ==================== STATUS HELPERS ====================

    private String getStatusLabel(String status) {
        return switch (status) {
            case "PENDING"     -> "⏳ Pending Review";
            case "IN_PROGRESS" -> "🔧 Repair In Progress";
            case "RESOLVED"    -> "✅ Pothole Resolved";
            default            -> status;
        };
    }

    private String getStatusColor(String status) {
        return switch (status) {
            case "PENDING"     -> "#f59e0b";
            case "IN_PROGRESS" -> "#3b82f6";
            case "RESOLVED"    -> "#10b981";
            default            -> "#6b7280";
        };
    }
}