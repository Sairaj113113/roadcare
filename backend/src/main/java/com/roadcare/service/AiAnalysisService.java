package com.roadcare.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.*;

import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.net.URL;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REAL Gemini Vision AI pothole analysis.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AiAnalysisService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate =
            new RestTemplate();

    private final ObjectMapper objectMapper =
            new ObjectMapper();

    /**
     * Analyze pothole image using Gemini Vision.
     */
    public Map<String, Object> analyzePotholeImage(
            String imageUrl
    ) {

        try {

            log.info(
                    "Starting Gemini Vision analysis..."
            );

            // =====================================================
            // DOWNLOAD IMAGE
            // =====================================================

            URL url = new URL(imageUrl);

            InputStream inputStream =
                    url.openStream();

            byte[] imageBytes =
                    inputStream.readAllBytes();

            inputStream.close();

            // =====================================================
            // CONVERT IMAGE TO BASE64
            // =====================================================

            String base64Image =
                    Base64.getEncoder()
                            .encodeToString(imageBytes);

            // =====================================================
            // GEMINI API URL
            // =====================================================

            String apiUrl =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                            + geminiApiKey;

            // =====================================================
            // HEADERS
            // =====================================================

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            // =====================================================
            // PROMPT
            // =====================================================

            String prompt = """
                    Analyze this pothole road image.

                    Return ONLY valid JSON.

                    Example:

                    {
                      "size": "SMALL",
                      "description": "Small shallow pothole visible on road.",
                      "recommendedAction": "Minor repair recommended."
                    }

                    CLASSIFICATION RULES:

                    - SMALL:
                      Tiny pothole or crack.
                      Small road damage.

                    - MEDIUM:
                      Moderate pothole.
                      Visible road wear.

                    - LARGE:
                      Deep or dangerous pothole.
                      Serious road damage.

                    IMPORTANT:
                    Analyze pothole size relative to road width.
                    Do not exaggerate close-up images.
                    """;

            // =====================================================
            // TEXT PART
            // =====================================================

            Map<String, Object> textPart =
                    Map.of(
                            "text",
                            prompt
                    );

            // =====================================================
            // IMAGE PART
            // =====================================================

            Map<String, Object> inlineData =
                    Map.of(
                            "mimeType",
                            "image/jpeg",
                            "data",
                            base64Image
                    );

            Map<String, Object> imagePart =
                    Map.of(
                            "inlineData",
                            inlineData
                    );

            // =====================================================
            // CONTENT
            // =====================================================

            Map<String, Object> content =
                    Map.of(
                            "parts",
                            List.of(
                                    textPart,
                                    imagePart
                            )
                    );

            // =====================================================
            // REQUEST BODY
            // =====================================================

            Map<String, Object> body =
                    Map.of(
                            "contents",
                            List.of(content)
                    );

            // =====================================================
            // API CALL
            // =====================================================

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(
                            body,
                            headers
                    );

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            apiUrl,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            // =====================================================
            // RESPONSE
            // =====================================================

            JsonNode root =
                    objectMapper.readTree(
                            response.getBody()
                    );

            String aiText = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            // Remove markdown
            aiText = aiText
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            // Extract JSON only
            int start = aiText.indexOf("{");

            int end = aiText.lastIndexOf("}");

            if (start != -1 && end != -1) {

                aiText = aiText.substring(
                        start,
                        end + 1
                );
            }

            log.info(
                    "AI RESPONSE: {}",
                    aiText
            );

            // =====================================================
            // PARSE JSON
            // =====================================================

            JsonNode aiJson =
                    objectMapper.readTree(aiText);

            String size =
                    aiJson.path("size").asText();

            String description =
                    aiJson.path("description").asText();

            String recommendedAction =
                    aiJson.path("recommendedAction").asText();

            // =====================================================
            // SIZE → SEVERITY
            // =====================================================

            String severity;

            double confidence;

            switch (size.toUpperCase()) {

                case "SMALL":

                    severity = "LOW";
                    confidence = 50;
                    break;

                case "MEDIUM":

                    severity = "MEDIUM";
                    confidence = 70;
                    break;

                default:

                    severity = "HIGH";
                    confidence = 90;
                    break;
            }

            // =====================================================
            // FINAL RESULT
            // =====================================================

            Map<String, Object> result =
                    new HashMap<>();

            result.put(
                    "severity",
                    severity
            );

            result.put(
                    "confidence",
                    confidence
            );

            result.put(
                    "description",
                    description
            );

            result.put(
                    "recommendedAction",
                    recommendedAction
            );

            log.info(
                    "REAL AI ANALYSIS SUCCESS"
            );

            return result;

        } catch (Exception e) {

            log.error(
                    "Gemini Vision failed",
                    e
            );

            // =====================================================
            // FALLBACK
            // =====================================================

            Map<String, Object> fallback =
                    new HashMap<>();

            fallback.put(
                    "severity",
                    "MEDIUM"
            );

            fallback.put(
                    "confidence",
                    70
            );

            fallback.put(
                    "description",
                    "Road damage detected."
            );

            fallback.put(
                    "recommendedAction",
                    "Inspection recommended."
            );

            return fallback;
        }
    }
}