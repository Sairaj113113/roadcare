package com.roadcare.controller;

import com.roadcare.dto.report.ReportResponseDTO;
import com.roadcare.service.MapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for map data endpoints in RoadCare.
 * All endpoints are publicly accessible — guests can view potholes on the map.
 * SecurityConfig permits GET /api/map/** without authentication.
 *
 * Endpoints:
 *   GET /api/map/potholes          — All potholes for full map view
 *   GET /api/map/city/{city}       — Potholes filtered by city
 */
@RestController
@RequestMapping("/api/map")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Map", description = "Public map data APIs for Leaflet.js integration")
public class MapController {

    private final MapService mapService;

    /**
     * Get all potholes for map marker display.
     * Returns lat, lng, status, imageUrl, address for each report.
     * Used by LeafletMap.jsx to render all pins on the map.
     */
    @GetMapping("/potholes")
    @Operation(summary = "Get all potholes for map (public)")
    public ResponseEntity<List<ReportResponseDTO>> getAllMapPotholes() {
        log.debug("Map potholes request received");
        return ResponseEntity.ok(mapService.getAllMapPotholes());
    }

    /**
     * Get potholes filtered by city for city-specific map view.
     * Case-insensitive city matching.
     * Used by LeafletMap.jsx when user filters by city.
     *
     * @param city City name (e.g. "Hyderabad")
     */
    @GetMapping("/city/{city}")
    @Operation(summary = "Get potholes by city (public)")
    public ResponseEntity<List<ReportResponseDTO>> getPotholesByCity(
            @PathVariable String city
    ) {
        log.debug("Map city filter request for: {}", city);
        return ResponseEntity.ok(mapService.getPotholesByCity(city));
    }
}