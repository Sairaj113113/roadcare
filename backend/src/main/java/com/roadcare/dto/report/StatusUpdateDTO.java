package com.roadcare.dto.report;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Request DTO for admin status update on a pothole report.
 * Received by PUT /api/admin/reports/{id}/status.
 * Status must be one of the three fixed values: PENDING, IN_PROGRESS, RESOLVED.
 */
@Getter
@Setter
@NoArgsConstructor
public class StatusUpdateDTO {

    @NotBlank(message = "Status is required.")
    @Pattern(
        regexp = "PENDING|IN_PROGRESS|RESOLVED",
        message = "Status must be one of: PENDING, IN_PROGRESS, RESOLVED."
    )
    private String status;

    /** Optional admin note recorded in status_history. */
    @Size(max = 1000, message = "Remarks must not exceed 1000 characters.")
    private String remarks;
}