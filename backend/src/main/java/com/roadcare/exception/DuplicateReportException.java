package com.roadcare.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when a submitted pothole report is detected as a duplicate
 * of an existing unresolved report within the configured radius.
 * Maps to HTTP 409 Conflict.
 * Used by ReportService during duplicate detection (Prompt 3).
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateReportException extends RuntimeException {

    public DuplicateReportException(String message) {
        super(message);
    }
}