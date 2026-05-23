package com.roadcare.dto.notification;

import com.roadcare.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Response DTO for notification data returned to the frontend.
 * Used by GET /api/notifications and notification bell in Navbar.
 * Entity is never exposed directly — always mapped to this DTO.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {

    private Long    id;
    private Long    reportId;
    private String  title;
    private String  message;
    private Boolean isRead;
    private LocalDateTime createdAt;

    /**
     * Static factory method to map a Notification entity to this DTO.
     *
     * @param notification The Notification entity to map
     * @return Populated NotificationDTO
     */
    public static NotificationDTO fromEntity(Notification notification) {
        return NotificationDTO.builder()
                .id(notification.getId())
                .reportId(notification.getReport().getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}