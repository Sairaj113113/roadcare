package com.roadcare.controller;

import com.roadcare.dto.report.ReportRequestDTO;
import com.roadcare.dto.report.ReportResponseDTO;
import com.roadcare.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * REST controller for pothole report operations in RoadCare.
 */
@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "Reports", description = "Pothole report submission and retrieval APIs")
public class ReportController {

    private final ReportService reportService;

    // ==================== SUBMIT REPORT ====================

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Submit pothole report", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ReportResponseDTO> createReport(
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("latitude")
            @NotNull @DecimalMin("-90.0") @DecimalMax("90.0") Double latitude,
            @RequestParam("longitude")
            @NotNull @DecimalMin("-180.0") @DecimalMax("180.0") Double longitude,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "city", required = false) String city,
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        ReportRequestDTO request = new ReportRequestDTO();

        request.setImage(image);
        request.setDescription(description);
        request.setLatitude(latitude);
        request.setLongitude(longitude);
        request.setAddress(address);
        request.setCity(city);

        log.info(
                "Report submission from user: {} at ({}, {})",
                userDetails.getUsername(),
                latitude,
                longitude
        );

        ReportResponseDTO response =
                reportService.createReport(request, userDetails.getUsername());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ==================== GET MY REPORTS ====================

    @GetMapping("/my")
    @Operation(summary = "Get my reports", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ReportResponseDTO>> getMyReports(
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        List<ReportResponseDTO> reports =
                reportService.getMyReports(userDetails.getUsername());

        return ResponseEntity.ok(reports);
    }

    // ==================== GET ALL REPORTS ====================

   @GetMapping("/all")
@Operation(
        summary = "Get admin reports",
        security = @SecurityRequirement(name = "bearerAuth")
)
public ResponseEntity<List<ReportResponseDTO>> getAllReports(
        @AuthenticationPrincipal UserDetails userDetails
) {

    List<ReportResponseDTO> reports =
            reportService.getAllReports(
                    userDetails.getUsername()
            );

    return ResponseEntity.ok(reports);
}

    // ==================== GET REPORT BY ID ====================

    @GetMapping("/{id}")
    @Operation(summary = "Get report by ID", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ReportResponseDTO> getReportById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(reportService.getReportById(id));
    }

    // ==================== NEARBY POTHOLES ====================

    @GetMapping("/nearby")
    @Operation(summary = "Get nearby potholes (public)")
    public ResponseEntity<List<ReportResponseDTO>> getNearbyReports(
            @RequestParam
            @NotNull
            @DecimalMin("-90.0")
            @DecimalMax("90.0")
            Double lat,

            @RequestParam
            @NotNull
            @DecimalMin("-180.0")
            @DecimalMax("180.0")
            Double lng
    ) {

        log.debug("Nearby potholes request at ({}, {})", lat, lng);

        return ResponseEntity.ok(
                reportService.getNearbyReports(lat, lng)
        );
    }

    // ==================== DUPLICATE CHECK ====================

    @PostMapping("/check-duplicate")
    @Operation(summary = "Check for duplicate pothole", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, Object>> checkDuplicate(
            @RequestParam
            @NotNull
            @DecimalMin("-90.0")
            @DecimalMax("90.0")
            Double lat,

            @RequestParam
            @NotNull
            @DecimalMin("-180.0")
            @DecimalMax("180.0")
            Double lng
    ) {

        boolean isDuplicate =
                reportService.checkDuplicate(lat, lng);

        return ResponseEntity.ok(
                Map.of(
                        "duplicate", isDuplicate,
                        "message",
                        isDuplicate
                                ? "An active pothole report already exists at this location."
                                : "No duplicate found. You can proceed with your report."
                )
        );
    }

    // ==================== HOMEPAGE STATS ====================

    /**
     * Public homepage statistics.
     */
    @GetMapping("/stats")
    @Operation(summary = "Get homepage stats")
    public ResponseEntity<Map<String, Object>> getHomepageStats() {

        return ResponseEntity.ok(
                reportService.getHomepageStats()
        );
    }
}