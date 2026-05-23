package com.roadcare.service;

import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

import com.roadcare.dto.report.ReportRequestDTO;
import com.roadcare.dto.report.ReportResponseDTO;
import com.roadcare.entity.PotholeReport;
import com.roadcare.entity.User;
import com.roadcare.entity.enums.ReportStatus;
import com.roadcare.entity.enums.UserRole;
import com.roadcare.exception.DuplicateReportException;
import com.roadcare.exception.ResourceNotFoundException;
import com.roadcare.repository.ReportRepository;
import com.roadcare.repository.UserRepository;
import com.roadcare.util.AppConstants;
import com.roadcare.util.LocationUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service layer for pothole report operations in RoadCare.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;

    // ==================== CREATE REPORT ====================

    @Transactional
    public ReportResponseDTO createReport(
            ReportRequestDTO request,
            String userEmail
    ) {

        // Validate coordinates
        LocationUtils.validateCoordinatesOrThrow(
                request.getLatitude(),
                request.getLongitude()
        );

        // Get authenticated user
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User",
                                "email",
                                userEmail
                        )
                );

        // Duplicate detection
        List<PotholeReport> nearbyUnresolved =
                reportRepository.findUnresolvedReportsWithinRadius(
                        request.getLatitude(),
                        request.getLongitude(),
                        AppConstants.DUPLICATE_RADIUS_KM
                );

        if (!nearbyUnresolved.isEmpty()) {

            PotholeReport existing = nearbyUnresolved.get(0);

            existing.setDuplicateCount(
                    existing.getDuplicateCount() + 1
            );

            reportRepository.save(existing);

            log.warn(
                    "Duplicate pothole detected at {} — matches report id={}",
                    LocationUtils.formatCoordinates(
                            request.getLatitude(),
                            request.getLongitude()
                    ),
                    existing.getId()
            );

            throw new DuplicateReportException(
                    "A pothole report already exists at this location (Report #"
                            + existing.getId()
                            + "). Your report has been counted as a duplicate."
            );
        }

        // Upload image
        String imageUrl =
                cloudinaryService.uploadImage(request.getImage());

        // Save report
        PotholeReport report = PotholeReport.builder()

                .user(user)

                .imageUrl(imageUrl)

                .description(request.getDescription())

                .latitude(request.getLatitude())

                .longitude(request.getLongitude())

                .address(request.getAddress())

                .city(
                        request.getCity() != null
                                ? request.getCity().trim()
                                : null
                )

                .status(ReportStatus.PENDING)

                .duplicateCount(0)

                .build();

        PotholeReport saved =
                reportRepository.save(report);

        log.info(
                "New pothole report created: id={}, user={}",
                saved.getId(),
                userEmail
        );

        return ReportResponseDTO.fromEntity(saved);
    }

    // ==================== GET REPORT BY ID ====================

    @Transactional(readOnly = true)
    public ReportResponseDTO getReportById(Long id) {

        PotholeReport report =
                reportRepository.findById(id)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "PotholeReport",
                                        "id",
                                        id
                                )
                        );

        return ReportResponseDTO.fromEntity(report);
    }

    // ==================== GET MY REPORTS ====================

    @Transactional(readOnly = true)
    public List<ReportResponseDTO> getMyReports(
            String userEmail
    ) {

        User user = userRepository.findByEmail(userEmail)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User",
                                "email",
                                userEmail
                        )
                );

        return reportRepository

                .findByUserIdOrderByCreatedAtDesc(user.getId())

                .stream()

                .map(ReportResponseDTO::fromEntity)

                .collect(Collectors.toList());
    }

    // ==================== GET ALL REPORTS ====================

    /**
     * SUPER_ADMIN -> all reports
     * ADMIN       -> only assigned city reports
     */
    @Transactional(readOnly = true)
    public List<ReportResponseDTO> getAllReports(
            String userEmail
    ) {

        User user = userRepository.findByEmail(userEmail)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User",
                                "email",
                                userEmail
                        )
                );

        // =========================================================
        // SUPER ADMIN -> ALL REPORTS
        // =========================================================

        if (user.getRole() == UserRole.SUPER_ADMIN) {

            return reportRepository.findAll()

                    .stream()

                    .map(ReportResponseDTO::fromEntity)

                    .collect(Collectors.toList());
        }

        // =========================================================
        // ADMIN -> ONLY ASSIGNED CITY REPORTS
        // =========================================================

        if (user.getRole() == UserRole.ADMIN) {

            if (user.getAssignedCity() == null) {

                throw new IllegalStateException(
                        "Admin city is not assigned."
                );
            }

            return reportRepository

                    .findByCityIgnoreCaseOrderByCreatedAtDesc(
                            user.getAssignedCity()
                    )

                    .stream()

                    .map(ReportResponseDTO::fromEntity)

                    .collect(Collectors.toList());
        }

        // =========================================================
        // NORMAL USERS SHOULD NOT ACCESS
        // =========================================================

        throw new IllegalStateException(
                "You are not authorized to access admin reports."
        );
    }

    // ==================== NEARBY REPORTS ====================

    @Transactional(readOnly = true)
    public List<ReportResponseDTO> getNearbyReports(
            Double lat,
            Double lng
    ) {

        LocationUtils.validateCoordinatesOrThrow(lat, lng);

        return reportRepository

                .findReportsWithinRadius(
                        lat,
                        lng,
                        AppConstants.NEARBY_RADIUS_KM
                )

                .stream()

                .map(ReportResponseDTO::fromEntity)

                .collect(Collectors.toList());
    }

    // ==================== DUPLICATE CHECK ====================

    @Transactional(readOnly = true)
    public boolean checkDuplicate(
            Double lat,
            Double lng
    ) {

        LocationUtils.validateCoordinatesOrThrow(lat, lng);

        List<PotholeReport> nearby =
                reportRepository.findUnresolvedReportsWithinRadius(
                        lat,
                        lng,
                        AppConstants.DUPLICATE_RADIUS_KM
                );

        return !nearby.isEmpty();
    }

    // ==================== MAP DATA ====================

    @Transactional(readOnly = true)
    public List<ReportResponseDTO> getAllForMap() {

        return reportRepository.findAll()

                .stream()

                .map(ReportResponseDTO::fromEntity)

                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReportResponseDTO> getReportsByCity(
            String city
    ) {

        return reportRepository

                .findByCityIgnoreCaseOrderByCreatedAtDesc(city)

                .stream()

                .map(ReportResponseDTO::fromEntity)

                .collect(Collectors.toList());
    }

    // ==================== HOMEPAGE STATS ====================

    /**
     * Dashboard statistics for homepage.
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getHomepageStats() {

        // Total reports
        long totalReports = reportRepository.count();

        // Status counts
        long resolved =
                reportRepository.countByStatus(
                        ReportStatus.RESOLVED
                );

        long pending =
                reportRepository.countByStatus(
                        ReportStatus.PENDING
                );

        long inProgress =
                reportRepository.countByStatus(
                        ReportStatus.IN_PROGRESS
                );

        // Cities covered
        long citiesCovered =
                reportRepository.countDistinctCities();

        // Resolution percentage
        double resolutionRate =
                totalReports == 0
                        ? 0
                        : ((double) resolved / totalReports) * 100;

        // Return response
        return Map.of(
                "totalReports", totalReports,
                "resolvedRate", Math.round(resolutionRate),
                "citiesCovered", citiesCovered,
                "resolved", resolved,
                "pending", pending,
                "inProgress", inProgress
        );
    }
}