package com.roadcare.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Audit log of every status transition on a PotholeReport.
 * Maps to the 'status_history' table in MySQL.
 * Created whenever an admin updates a report's status.
 * Enables full complaint progress tracking and admin accountability.
 */
@Entity
@Table(name = "status_history", indexes = {
        @Index(name = "idx_status_history_report_id", columnList = "report_id"),
        @Index(name = "idx_status_history_changed_by", columnList = "changed_by")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The pothole report this history entry belongs to.
     * Many history entries can exist for one report.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id", nullable = false)
    private PotholeReport report;

    @Column(name = "old_status", nullable = false, length = 50)
    private String oldStatus;

    @Column(name = "new_status", nullable = false, length = 50)
    private String newStatus;

    /**
     * ID of the admin user who performed the status change.
     * Stored as plain Long (not FK) to avoid circular dependency;
     * admin identity is resolved via UserRepository when needed.
     */
    @Column(name = "changed_by", nullable = false)
    private Long changedBy;

    /**
     * Optional note added by the admin when updating status.
     * Example: "Repair crew dispatched", "Work completed on 12-May-2026"
     */
    @Column(name = "remarks", columnDefinition = "TEXT")
    private String remarks;

    @CreationTimestamp
    @Column(name = "changed_at", nullable = false, updatable = false)
    private LocalDateTime changedAt;
}