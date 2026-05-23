package com.roadcare.dto.report;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * Request DTO for submitting a new pothole report.
 * Received via multipart/form-data by POST /api/reports.
 * The image is handled as a MultipartFile; all other fields are form parameters.
 */
@Getter
@Setter
@NoArgsConstructor
public class ReportRequestDTO {

    /** Pothole image — required, uploaded to Cloudinary. */
    @NotNull(message = "Pothole image is required.")
    private MultipartFile image;

    @Size(max = 1000, message = "Description must not exceed 1000 characters.")
    private String description;

    @NotNull(message = "Latitude is required.")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90.")
    @DecimalMax(value = "90.0",  message = "Latitude must be between -90 and 90.")
    private Double latitude;

    @NotNull(message = "Longitude is required.")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180.")
    @DecimalMax(value = "180.0",  message = "Longitude must be between -180 and 180.")
    private Double longitude;

    /** Human-readable street address — resolved by frontend via reverse geocoding. */
    @Size(max = 255, message = "Address must not exceed 255 characters.")
    private String address;

    @Size(max = 100, message = "City name must not exceed 100 characters.")
    private String city;
}