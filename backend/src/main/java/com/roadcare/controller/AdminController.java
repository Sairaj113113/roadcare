package com.roadcare.controller;

import com.roadcare.dto.auth.LoginRequestDTO;
import com.roadcare.dto.auth.LoginResponseDTO;
import com.roadcare.dto.report.ReportResponseDTO;
import com.roadcare.dto.report.StatusUpdateDTO;
import com.roadcare.service.AdminService;
import com.roadcare.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * City-based admin controller for RoadCare.
 *
 * Each admin manages ONLY their assigned city.
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
@Tag(
        name = "Admin",
        description = "City-based admin management APIs"
)
public class AdminController {

    private final AdminService adminService;
    private final AuthService authService;

    // ==================== ADMIN LOGIN ====================

    @PostMapping("/login")
    @Operation(summary = "Admin login")
    public ResponseEntity<LoginResponseDTO> adminLogin(
            @Valid @RequestBody LoginRequestDTO request
    ) {

        log.info("Admin login attempt: {}", request.getEmail());

        return ResponseEntity.ok(
                authService.adminLogin(request)
        );
    }

    // ==================== GET ALL REPORTS ====================

    /**
     * Returns ONLY reports from admin assigned city.
     */
    @GetMapping("/reports")
    @Operation(
            summary = "Get city reports",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<List<ReportResponseDTO>> getAllReports(
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        return ResponseEntity.ok(
                adminService.getAllReports(
                        userDetails.getUsername()
                )
        );
    }

    // ==================== GET REPORT BY ID ====================

    /**
     * Returns report only if it belongs to admin assigned city.
     */
    @GetMapping("/reports/{id}")
    @Operation(
            summary = "Get report details",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ReportResponseDTO> getReportById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        return ResponseEntity.ok(
                adminService.getReportById(
                        id,
                        userDetails.getUsername()
                )
        );
    }

    // ==================== FILTER REPORTS ====================

    /**
     * Filters reports ONLY inside assigned city.
     */
    @GetMapping("/reports/filter")
    @Operation(
            summary = "Filter city reports",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<List<ReportResponseDTO>> filterReports(
            @RequestParam(required = false) String status,
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        return ResponseEntity.ok(
                adminService.filterReports(
                        status,
                        userDetails.getUsername()
                )
        );
    }

    // ==================== UPDATE STATUS ====================

    /**
     * Update pothole status inside assigned city.
     */
    @PutMapping("/reports/{id}/status")
    @Operation(
            summary = "Update report status",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ReportResponseDTO> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateDTO request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        log.info(
                "Admin {} updating report #{} to {}",
                userDetails.getUsername(),
                id,
                request.getStatus()
        );

        return ResponseEntity.ok(
                adminService.updateReportStatus(
                        id,
                        request,
                        userDetails.getUsername()
                )
        );
    }

    // ==================== DASHBOARD ====================

    /**
     * Dashboard statistics ONLY for assigned city.
     */
    @GetMapping("/dashboard")
    @Operation(
            summary = "Get dashboard statistics",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<Map<String, Object>> getDashboard(
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        return ResponseEntity.ok(
                adminService.getDashboardStats(
                        userDetails.getUsername()
                )
        );
    }
}