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
 * Exposes all report fields including reporter info, location, status, and image.
 * Entity is never exposed directly — always mapped to this DTO.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponseDTO {

    private Long   id;
    private String imageUrl;
    private String description;
    private Double latitude;
    private Double longitude;
    private String address;
    private String city;
    private String status;
    private Integer duplicateCount;

    // Reporter info (no password or sensitive data)
    private Long   reporterId;
    private String reporterName;
    private String reporterEmail;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * Static factory method to map a PotholeReport entity to this DTO.
     * Keeps mapping logic co-located with the DTO.
     *
     * @param report The PotholeReport entity to map
     * @return Populated ReportResponseDTO
     */
    public static ReportResponseDTO fromEntity(PotholeReport report) {
        return ReportResponseDTO.builder()
                .id(report.getId())
                .imageUrl(report.getImageUrl())
                .description(report.getDescription())
                .latitude(report.getLatitude())
                .longitude(report.getLongitude())
                .address(report.getAddress())
                .city(report.getCity())
                .status(report.getStatus().name())
                .duplicateCount(report.getDuplicateCount())
                .reporterId(report.getUser().getId())
                .reporterName(report.getUser().getName())
                .reporterEmail(report.getUser().getEmail())
                .createdAt(report.getCreatedAt())
                .updatedAt(report.getUpdatedAt())
                .build();
    }
}