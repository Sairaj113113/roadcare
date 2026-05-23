package com.roadcare.service;

import com.roadcare.dto.report.ReportResponseDTO;
import com.roadcare.dto.report.StatusUpdateDTO;
import com.roadcare.entity.PotholeReport;
import com.roadcare.entity.StatusHistory;
import com.roadcare.entity.User;
import com.roadcare.entity.enums.ReportStatus;
import com.roadcare.entity.enums.UserRole;
import com.roadcare.exception.ResourceNotFoundException;
import com.roadcare.exception.UnauthorizedException;
import com.roadcare.repository.ReportRepository;
import com.roadcare.repository.StatusHistoryRepository;
import com.roadcare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * City-scoped admin service for RoadCare.
 *
 * Each admin manages ONLY their assigned city.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final ReportRepository reportRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;

    // ==================== HELPERS ====================

    private User getAdmin(String adminEmail) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User", "email", adminEmail));

        if (admin.getRole() != UserRole.ADMIN) {
            throw new UnauthorizedException("Only admins can access admin resources.");
        }

        if (admin.getAssignedCity() == null || admin.getAssignedCity().isBlank()) {
            throw new UnauthorizedException("Admin has no assigned city.");
        }

        return admin;
    }

    // ==================== GET ALL REPORTS ====================

    /**
     * Returns ONLY reports from admin assigned city.
     */
    @Transactional(readOnly = true)
    public List<ReportResponseDTO> getAllReports(String adminEmail) {

        User admin = getAdmin(adminEmail);

        return reportRepository
                .findByCityIgnoreCaseOrderByCreatedAtDesc(admin.getAssignedCity())
                .stream()
                .map(ReportResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ==================== GET REPORT BY ID ====================

    /**
     * Admin can open only reports from assigned city.
     */
    @Transactional(readOnly = true)
    public ReportResponseDTO getReportById(Long reportId, String adminEmail) {

        User admin = getAdmin(adminEmail);

        PotholeReport report = reportRepository.findById(reportId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("PotholeReport", "id", reportId));

        if (report.getCity() == null ||
                !report.getCity().equalsIgnoreCase(admin.getAssignedCity())) {

            throw new UnauthorizedException(
                    "You cannot access reports outside your assigned city.");
        }

        return ReportResponseDTO.fromEntity(report);
    }

    // ==================== FILTER REPORTS ====================

    /**
     * Filters ONLY within admin assigned city.
     */
    @Transactional(readOnly = true)
    public List<ReportResponseDTO> filterReports(
            String status,
            String adminEmail
    ) {

        User admin = getAdmin(adminEmail);

        List<PotholeReport> results;

        boolean hasStatus = status != null && !status.isBlank();

        if (hasStatus) {

            ReportStatus rs = parseStatus(status);

            results = reportRepository
                    .findByCityIgnoreCaseAndStatusOrderByCreatedAtDesc(
                            admin.getAssignedCity(),
                            rs
                    );

        } else {

            results = reportRepository
                    .findByCityIgnoreCaseOrderByCreatedAtDesc(
                            admin.getAssignedCity()
                    );
        }

        return results.stream()
                .map(ReportResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ==================== UPDATE STATUS ====================

    /**
     * Admin can update ONLY reports from assigned city.
     */
    @Transactional
    public ReportResponseDTO updateReportStatus(
            Long reportId,
            StatusUpdateDTO request,
            String adminEmail
    ) {

        User admin = getAdmin(adminEmail);

        PotholeReport report = reportRepository.findById(reportId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "PotholeReport",
                                "id",
                                reportId
                        ));

        if (report.getCity() == null ||
                !report.getCity().equalsIgnoreCase(admin.getAssignedCity())) {

            throw new UnauthorizedException(
                    "You cannot update reports outside your assigned city.");
        }

        ReportStatus oldStatus = report.getStatus();
        ReportStatus newStatus = ReportStatus.valueOf(request.getStatus());

        if (oldStatus == newStatus) {
            return ReportResponseDTO.fromEntity(report);
        }

        report.setStatus(newStatus);

        PotholeReport updatedReport = reportRepository.save(report);

        // Create status history
        StatusHistory history = StatusHistory.builder()
                .report(updatedReport)
                .oldStatus(oldStatus.name())
                .newStatus(newStatus.name())
                .changedBy(admin.getId())
                .remarks(request.getRemarks())
                .build();

        statusHistoryRepository.save(history);

        // Create notification
        notificationService.createStatusNotification(
                updatedReport,
                newStatus,
                request.getRemarks()
        );

        // Send email
        User reporter = updatedReport.getUser();

        emailService.sendStatusUpdateEmail(
                reporter.getEmail(),
                reporter.getName(),
                reportId,
                newStatus.name(),
                request.getRemarks()
        );

        log.info(
                "Admin {} updated report #{} to {}",
                adminEmail,
                reportId,
                newStatus
        );

        return ReportResponseDTO.fromEntity(updatedReport);
    }

    // ==================== DASHBOARD ====================

    /**
     * Dashboard statistics ONLY for assigned city.
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardStats(String adminEmail) {

        User admin = getAdmin(adminEmail);

        List<PotholeReport> reports =
                reportRepository.findByCityIgnoreCaseOrderByCreatedAtDesc(
                        admin.getAssignedCity()
                );

        long total = reports.size();

        long pending = reports.stream()
                .filter(r -> r.getStatus() == ReportStatus.PENDING)
                .count();

        long inProgress = reports.stream()
                .filter(r -> r.getStatus() == ReportStatus.IN_PROGRESS)
                .count();

        long resolved = reports.stream()
                .filter(r -> r.getStatus() == ReportStatus.RESOLVED)
                .count();

        long duplicates = reports.stream()
                .mapToLong(r ->
                        r.getDuplicateCount() != null
                                ? r.getDuplicateCount()
                                : 0
                )
                .sum();

        Map<String, Object> stats = new HashMap<>();

        stats.put("city", admin.getAssignedCity());
        stats.put("totalReports", total);
        stats.put("pendingCount", pending);
        stats.put("inProgressCount", inProgress);
        stats.put("resolvedCount", resolved);
        stats.put("duplicateCount", duplicates);

        return stats;
    }

    // ==================== HELPERS ====================

    private ReportStatus parseStatus(String status) {

        try {
            return ReportStatus.valueOf(status.toUpperCase());

        } catch (IllegalArgumentException ex) {

            throw new IllegalArgumentException(
                    "Invalid status value: " + status
            );
        }
    }
}