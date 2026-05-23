package com.roadcare.repository;

import com.roadcare.entity.StatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for StatusHistory entity.
 * Provides database operations on the 'status_history' table.
 * Used by AdminService to persist and retrieve audit trails of status changes.
 */
@Repository
public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {

    /**
     * Fetch the complete status change history for a specific report, oldest first.
     * Oldest-first ordering shows the progression: PENDING → IN_PROGRESS → RESOLVED.
     * Used by GET /api/reports/{id} and GET /api/admin/reports/{id}.
     */
    List<StatusHistory> findByReportIdOrderByChangedAtAsc(Long reportId);
}