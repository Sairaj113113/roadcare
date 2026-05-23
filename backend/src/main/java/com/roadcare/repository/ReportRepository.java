package com.roadcare.repository;

import com.roadcare.entity.PotholeReport;
import com.roadcare.entity.enums.ReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for PotholeReport entity.
 * Handles:
 * - user reports
 * - city-based admin reports
 * - duplicate detection
 * - nearby pothole search
 */
@Repository
public interface ReportRepository extends JpaRepository<PotholeReport, Long> {

    // ==================== USER REPORTS ====================

    /**
     * Get all reports submitted by a specific user.
     */
    List<PotholeReport> findByUserIdOrderByCreatedAtDesc(Long userId);

    // ==================== CITY-BASED ADMIN REPORTS ====================

    /**
     * Get all reports from a city.
     */
    List<PotholeReport> findByCityIgnoreCaseOrderByCreatedAtDesc(
            String city
    );

    /**
     * Get city reports filtered by status.
     */
    List<PotholeReport> findByCityIgnoreCaseAndStatusOrderByCreatedAtDesc(
            String city,
            ReportStatus status
    );

    /**
     * Get reports globally by status.
     * Mostly useful for super admin later.
     */
    List<PotholeReport> findByStatusOrderByCreatedAtDesc(
            ReportStatus status
    );

    // ==================== NEARBY REPORTS ====================

    /**
     * Find reports within a radius using Haversine formula.
     * Used by:
     * - nearby potholes
     * - map module
     */
    @Query("""
            SELECT r FROM PotholeReport r
            WHERE (
                6371 * acos(
                    cos(radians(:lat))
                    * cos(radians(r.latitude))
                    * cos(radians(r.longitude) - radians(:lng))
                    + sin(radians(:lat))
                    * sin(radians(r.latitude))
                )
            ) <= :radius
            ORDER BY r.createdAt DESC
            """)
    List<PotholeReport> findReportsWithinRadius(
            @Param("lat") Double lat,
            @Param("lng") Double lng,
            @Param("radius") Double radius
    );

   // ==================== DUPLICATE DETECTION ====================

/**
 * Radius (in KM) used to detect duplicate pothole reports.
 *
 * 0.025 KM = 25 meters
 * Good balance:
 * - prevents duplicate spam for same pothole
 * - allows nearby potholes to be reported separately
 */
static final double DUPLICATE_RADIUS_KM = 0.025;


/**
 * Find unresolved reports near location.
 * Used for duplicate pothole detection.
 */
@Query("""
        SELECT r FROM PotholeReport r
        WHERE r.status <> com.roadcare.entity.enums.ReportStatus.RESOLVED
        AND (
            6371 * acos(
                cos(radians(:lat))
                * cos(radians(r.latitude))
                * cos(radians(r.longitude) - radians(:lng))
                + sin(radians(:lat))
                * sin(radians(r.latitude))
            )
        ) <= :radius
        ORDER BY r.createdAt ASC
        """)
List<PotholeReport> findUnresolvedReportsWithinRadius(
        @Param("lat") Double lat,
        @Param("lng") Double lng,
        @Param("radius") Double radius
);
     
/**
 * Total reports count.
 */
long count();

/**
 * Total resolved reports count.
 */
long countByStatus(ReportStatus status);

/**
 * Total distinct cities covered.
 */
@Query("""
       SELECT COUNT(DISTINCT r.city)
       FROM PotholeReport r
       WHERE r.city IS NOT NULL
       AND r.city <> ''
       """)
long countDistinctCities();
}       