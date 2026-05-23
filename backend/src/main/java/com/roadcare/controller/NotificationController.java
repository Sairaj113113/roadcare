package com.roadcare.controller;

import com.roadcare.dto.notification.NotificationDTO;
import com.roadcare.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for notification operations in RoadCare.
 * All endpoints require a valid JWT Bearer token.
 * Users can only access their own notifications.
 *
 * Endpoints:
 *   GET /api/notifications                — All notifications for logged-in user
 *   GET /api/notifications/unread-count   — Unread badge count
 *   PUT /api/notifications/{id}/read      — Mark one notification as read
 *   PUT /api/notifications/read-all       — Mark all notifications as read
 */
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Notifications", description = "In-app notification APIs — JWT required")
public class NotificationController {

    private final NotificationService notificationService;

    // ==================== GET ALL NOTIFICATIONS ====================

    /**
     * Get all notifications for the authenticated user, newest first.
     * Used by NotificationPage.jsx and NotificationList.jsx.
     */
    @GetMapping
    @Operation(summary = "Get user notifications", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<NotificationDTO>> getNotifications(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<NotificationDTO> notifications =
                notificationService.getUserNotifications(userDetails.getUsername());
        return ResponseEntity.ok(notifications);
    }

    // ==================== UNREAD COUNT ====================

    /**
     * Get the count of unread notifications.
     * Used by the notification bell badge in Navbar.jsx.
     * Returns: { "unreadCount": N }
     */
    @GetMapping("/unread-count")
    @Operation(summary = "Get unread notification count", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, Object>> getUnreadCount(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        long count = notificationService.getUnreadCount(userDetails.getUsername());
        return ResponseEntity.ok(Map.of("unreadCount", count));
    }

    // ==================== MARK ONE AS READ ====================

    /**
     * Mark a single notification as read.
     * Validates ownership — users can only mark their own notifications.
     * Used by NotificationCard.jsx on click.
     *
     * @param id Notification ID to mark as read
     */
    @PutMapping("/{id}/read")
    @Operation(summary = "Mark notification as read", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, Object>> markAsRead(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        notificationService.markAsRead(id, userDetails.getUsername());
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Notification marked as read."
        ));
    }

    // ==================== MARK ALL AS READ ====================

    /**
     * Mark all notifications as read for the authenticated user.
     * Used by "Mark all read" button in NotificationPage.jsx.
     */
    @PutMapping("/read-all")
    @Operation(summary = "Mark all notifications as read", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, Object>> markAllAsRead(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        notificationService.markAllAsRead(userDetails.getUsername());
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "All notifications marked as read."
        ));
    }
}