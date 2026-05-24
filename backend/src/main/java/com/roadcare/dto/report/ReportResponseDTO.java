package com.roadcare.dto.report;

import com.roadcare.entity.PotholeReport;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Response DTO for pothole report data returned to the frontend.
 * Exposes all report fields including reporter info,
 * location, status, image, and AI analysis.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponseDTO {

    // =========================================================
    // BASIC REPORT DATA
    // =========================================================

    private Long id;

    private String imageUrl;

    private String description;

    private Double latitude;

    private Double longitude;

    private String address;

    private String city;

    private String status;

    private Integer duplicateCount;

    // =========================================================
    // REPORTER INFO
    // =========================================================

    private Long reporterId;

    private String reporterName;

    private String reporterEmail;

    // =========================================================
    // AI ANALYSIS
    // =========================================================

    private String aiSeverity;

    private Double aiConfidence;

    private String aiDescription;

    private String aiRecommendedAction;

    // =========================================================
    // TIMESTAMPS
    // =========================================================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    /**
     * Static factory method to map
     * PotholeReport entity -> DTO.
     */
    public static ReportResponseDTO fromEntity(
            PotholeReport report
    ) {

        return ReportResponseDTO.builder()

                // =============================================
                // BASIC REPORT DATA
                // =============================================

                .id(report.getId())

                .imageUrl(report.getImageUrl())

                .description(report.getDescription())

                .latitude(report.getLatitude())

                .longitude(report.getLongitude())

                .address(report.getAddress())

                .city(report.getCity())

                .status(report.getStatus().name())

                .duplicateCount(
                        report.getDuplicateCount()
                )

                // =============================================
                // REPORTER INFO
                // =============================================

                .reporterId(
                        report.getUser().getId()
                )

                .reporterName(
                        report.getUser().getName()
                )

                .reporterEmail(
                        report.getUser().getEmail()
                )

                // =============================================
                // AI ANALYSIS
                // =============================================

                .aiSeverity(
                        report.getAiSeverity()
                )

                .aiConfidence(
                        report.getAiConfidence()
                )

                .aiDescription(
                        report.getAiDescription()
                )

                .aiRecommendedAction(
                        report.getAiRecommendedAction()
                )

                // =============================================
                // TIMESTAMPS
                // =============================================

                .createdAt(
                        report.getCreatedAt()
                )

                .updatedAt(
                        report.getUpdatedAt()
                )

                .build();
    }
}