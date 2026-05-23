package com.roadcare.service;

import com.roadcare.dto.notification.NotificationDTO;
import com.roadcare.entity.Notification;
import com.roadcare.entity.PotholeReport;
import com.roadcare.entity.User;
import com.roadcare.entity.enums.ReportStatus;
import com.roadcare.exception.ResourceNotFoundException;
import com.roadcare.exception.UnauthorizedException;
import com.roadcare.repository.NotificationRepository;
import com.roadcare.repository.UserRepository;
import com.roadcare.util.AppConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for managing in-app notifications in RoadCare.
 *
 * Responsibilities:
 * - Create notification records when report status changes
 * - Retrieve notifications for the authenticated user
 * - Mark notifications as read
 * - Provide unread count for frontend notification badge
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository         userRepository;

    // ==================== CREATE NOTIFICATION ====================

    /**
     * Create an in-app notification for the report's owner after a status change.
     * Called by AdminService during every status update.
     *
     * @param report    The PotholeReport that was updated
     * @param newStatus The new ReportStatus applied
     * @param remarks   Optional admin remarks to include in the message
     */
    @Transactional
    public void createStatusNotification(PotholeReport report, ReportStatus newStatus, String remarks) {
        String title   = resolveTitle(newStatus);
        String message = buildMessage(report.getId(), newStatus, remarks);

        Notification notification = Notification.builder()
                .user(report.getUser())
                .report(report)
                .title(title)
                .message(message)
                .isRead(false)
                .build();

        notificationRepository.save(notification);
        log.info("Notification created for user={} report={} status={}",
                report.getUser().getEmail(), report.getId(), newStatus);
    }

    // ==================== GET NOTIFICATIONS ====================

    /**
     * Get all notifications for the currently authenticated user, newest first.
     * Used by GET /api/notifications.
     *
     * @param userEmail Email of the authenticated user
     * @return List of NotificationDTO
     */
    @Transactional(readOnly = true)
    public List<NotificationDTO> getUserNotifications(String userEmail) {
        User user = getUserByEmail(userEmail);
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(NotificationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get unread notification count for the authenticated user.
     * Used by GET /api/notifications/unread-count — powers the frontend bell badge.
     *
     * @param userEmail Email of the authenticated user
     * @return Count of unread notifications
     */
    @Transactional(readOnly = true)
    public long getUnreadCount(String userEmail) {
        User user = getUserByEmail(userEmail);
        return notificationRepository.countByUserIdAndIsReadFalse(user.getId());
    }

    // ==================== MARK AS READ ====================

    /**
     * Mark a specific notification as read.
     * Validates that the notification belongs to the requesting user.
     * Used by PUT /api/notifications/{id}/read.
     *
     * @param notificationId ID of the notification to mark read
     * @param userEmail      Email of the authenticated user (ownership check)
     */
    @Transactional
    public void markAsRead(Long notificationId, String userEmail) {
        User user = getUserByEmail(userEmail);

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));

        // Security: ensure the notification belongs to the requesting user
        if (!notification.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You do not have permission to access this notification.");
        }

        notification.setIsRead(true);
        notificationRepository.save(notification);
        log.debug("Notification {} marked as read for user {}", notificationId, userEmail);
    }

    /**
     * Mark all notifications as read for the authenticated user.
     * Convenience method for "mark all read" frontend action.
     *
     * @param userEmail Email of the authenticated user
     */
    @Transactional
    public void markAllAsRead(String userEmail) {
        User user = getUserByEmail(userEmail);
        List<Notification> unread =
                notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(user.getId());
        unread.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(unread);
        log.info("All {} notifications marked as read for user {}", unread.size(), userEmail);
    }

    // ==================== PRIVATE HELPERS ====================

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    private String resolveTitle(ReportStatus status) {
        return switch (status) {
            case PENDING     -> AppConstants.NOTIF_TITLE_PENDING;
            case IN_PROGRESS -> AppConstants.NOTIF_TITLE_IN_PROGRESS;
            case RESOLVED    -> AppConstants.NOTIF_TITLE_RESOLVED;
        };
    }

    private String buildMessage(Long reportId, ReportStatus status, String remarks) {
        String base = switch (status) {
            case PENDING     -> "Your pothole report #" + reportId + " has been received and is pending review.";
            case IN_PROGRESS -> "Repair work has started on your pothole report #" + reportId + ".";
            case RESOLVED    -> "Great news! Your pothole report #" + reportId + " has been resolved.";
        };
        if (remarks != null && !remarks.isBlank()) {
            base += " Admin note: " + remarks;
        }
        return base;
    }
}