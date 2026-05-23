package com.roadcare.repository;

import com.roadcare.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Notification entity.
 * Provides database operations on the 'notifications' table.
 * Used by NotificationService to create and retrieve user notifications.
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    /**
     * Fetch all notifications for a specific user, newest first.
     * Used by GET /api/notifications.
     */
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    /**
     * Fetch only unread notifications for a specific user.
     * Used to compute the unread notification badge count in the frontend Navbar.
     */
    List<Notification> findByUserIdAndIsReadFalseOrderByCreatedAtDesc(Long userId);

    /**
     * Count unread notifications for a user.
     * Used for the notification bell badge in the frontend.
     */
    long countByUserIdAndIsReadFalse(Long userId);
}