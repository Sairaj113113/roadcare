package com.roadcare.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.roadcare.entity.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a registered user of the RoadCare platform.
 *
 * Roles:
 * USER         -> Regular citizen who submits pothole reports
 * ADMIN        -> City-level administrator who manages reports
 * SUPER_ADMIN  -> Controls all admins and platform operations
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private UserRole role;

    /**
     * Assigned city for ADMIN users.
     *
     * Examples:
     * Hyderabad
     * Warangal
     * Karimnagar
     *
     * Null for USER accounts.
     * Optional for SUPER_ADMIN.
     */
    @Column(name = "assigned_city", length = 100)
    private String assignedCity;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // ==================== RELATIONSHIPS ====================

    /**
     * One user can submit many pothole reports.
     */
    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    @Builder.Default
    private List<PotholeReport> reports = new ArrayList<>();

    /**
     * One user can receive many notifications.
     */
    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    @Builder.Default
    private List<Notification> notifications = new ArrayList<>();
}