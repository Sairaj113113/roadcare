package com.roadcare.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.roadcare.util.AppConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Service for uploading pothole images to Cloudinary.
 * All images are stored under the configured folder: roadcare/potholes.
 * Returns a secure HTTPS URL stored in PotholeReport.imageUrl.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryService {

    private final Cloudinary cloudinary;

    /**
     * Upload a pothole image to Cloudinary.
     *
     * @param file  The multipart image file from the report submission form
     * @return      Secure HTTPS URL of the uploaded image
     * @throws RuntimeException if upload fails
     */
    @SuppressWarnings("unchecked")
    public String uploadImage(MultipartFile file) {
        validateImageFile(file);

        try {
            Map<String, Object> uploadParams = ObjectUtils.asMap(
                    "folder",          AppConstants.CLOUDINARY_FOLDER,
                    "resource_type",   "image",
                    "use_filename",    true,
                    "unique_filename", true,
                    "overwrite",       false
            );

            Map<String, Object> result = cloudinary.uploader()
                    .upload(file.getBytes(), uploadParams);

            String secureUrl = (String) result.get("secure_url");
            log.info("Image uploaded to Cloudinary: {}", secureUrl);
            return secureUrl;

        } catch (IOException ex) {
            log.error("Cloudinary upload failed: {}", ex.getMessage(), ex);
            throw new RuntimeException("Failed to upload image. Please try again.");
        }
    }

    /**
     * Delete an image from Cloudinary by its public ID.
     * Called when a report is removed or the image is replaced.
     *
     * @param publicId The Cloudinary public ID extracted from the image URL
     */
    @SuppressWarnings("unchecked")
    public void deleteImage(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            log.info("Image deleted from Cloudinary: {}", publicId);
        } catch (IOException ex) {
            log.warn("Cloudinary deletion failed for publicId {}: {}", publicId, ex.getMessage());
            // Non-critical: log warning but do not throw — report deletion continues
        }
    }

    /**
     * Extract the Cloudinary public ID from a full secure URL.
     * Format: https://res.cloudinary.com/{cloud}/image/upload/v{version}/{folder}/{filename}
     * Returns: {folder}/{filename} (without extension)
     */
    public String extractPublicId(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) return null;
        try {
            // Extract everything after "/upload/" and strip the version prefix (v12345/)
            String afterUpload = imageUrl.substring(imageUrl.indexOf("/upload/") + 8);
            // Remove version segment if present (e.g. "v1234567890/")
            if (afterUpload.startsWith("v") && afterUpload.contains("/")) {
                afterUpload = afterUpload.substring(afterUpload.indexOf("/") + 1);
            }
            // Remove file extension
            int dotIndex = afterUpload.lastIndexOf(".");
            return dotIndex > 0 ? afterUpload.substring(0, dotIndex) : afterUpload;
        } catch (Exception ex) {
            log.warn("Could not extract public ID from URL: {}", imageUrl);
            return null;
        }
    }

    // ==================== PRIVATE VALIDATION ====================

    private void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Image file is required and cannot be empty.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed (JPEG, PNG, WEBP).");
        }

        // 10 MB limit — matches application.properties max-file-size
        long maxSizeBytes = 10L * 1024 * 1024;
        if (file.getSize() > maxSizeBytes) {
            throw new IllegalArgumentException("Image file size must not exceed 10MB.");
        }
    }
}