package com.roadcare.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for AI pothole analysis response.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiAnalysisResponse {

    /**
     * LOW / MEDIUM / HIGH
     */
    private String severity;

    /**
     * AI confidence percentage.
     */
    private Double confidence;

    /**
     * AI-generated pothole description.
     */
    private String description;

    /**
     * Suggested repair action.
     */
    private String recommendedAction;
}