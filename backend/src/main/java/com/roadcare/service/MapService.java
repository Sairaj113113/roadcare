package com.roadcare.service;

import com.roadcare.dto.report.ReportResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service layer for map-related data in RoadCare.
 * Provides optimized data for the Leaflet.js map frontend.
 * Delegates core data retrieval to ReportService to avoid duplication.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MapService {

    private final ReportService reportService;

    /**
     * Get all potholes formatted for Leaflet map markers.
     * Returns full ReportResponseDTO — the frontend extracts
     * lat/lng/status/imageUrl for marker rendering.
     * Used by GET /api/map/potholes.
     */
    @Transactional(readOnly = true)
    public List<ReportResponseDTO> getAllMapPotholes() {
        log.debug("Fetching all potholes for map display");
        return reportService.getAllForMap();
    }

    /**
     * Get all potholes in a specific city for filtered map view.
     * Used by GET /api/map/city/{city}.
     *
     * @param city City name (case-insensitive)
     */
    @Transactional(readOnly = true)
    public List<ReportResponseDTO> getPotholesByCity(String city) {
        log.debug("Fetching potholes for city: {}", city);
        return reportService.getReportsByCity(city);
    }
}