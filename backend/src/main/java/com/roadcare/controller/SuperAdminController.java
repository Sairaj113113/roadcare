package com.roadcare.controller;

import com.roadcare.dto.admin.CreateAdminRequestDTO;
import com.roadcare.entity.User;
import com.roadcare.entity.enums.UserRole;
import com.roadcare.repository.UserRepository;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Super Admin APIs.
 *
 * Accessible only by SUPER_ADMIN.
 */
@RestController
@RequestMapping("/api/super-admin")
@RequiredArgsConstructor
@Slf4j
public class SuperAdminController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    // =========================================================
    // CREATE ADMIN
    // =========================================================

    @PostMapping("/admins")
    public ResponseEntity<?> createAdmin(

            @Valid
            @RequestBody
            CreateAdminRequestDTO request
    ) {

        // ================= CHECK EMAIL =================

        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            return ResponseEntity.badRequest().body(
                    "Email already exists."
            );
        }

        // ================= CREATE ADMIN =================

        User admin = User.builder()

                .name(
                        request.getName().trim()
                )

                .email(
                        request.getEmail()
                                .toLowerCase()
                                .trim()
                )

                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )

                .role(UserRole.ADMIN)

                .assignedCity(
                        request.getAssignedCity().trim()
                )

                .build();

        User savedAdmin =
                userRepository.save(admin);

        log.info(
                "New admin created: {} for city {}",
                savedAdmin.getEmail(),
                savedAdmin.getAssignedCity()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedAdmin);
    }

    // =========================================================
    // GET ALL ADMINS
    // =========================================================

    @GetMapping("/admins")
    public ResponseEntity<List<User>> getAllAdmins() {

        List<User> admins =
                userRepository.findAll()

                        .stream()

                        .filter(user ->
                                user.getRole() == UserRole.ADMIN
                        )

                        .toList();

        return ResponseEntity.ok(admins);
    }

    // =========================================================
    // DELETE ADMIN
    // =========================================================

    @DeleteMapping("/admins/{id}")
    public ResponseEntity<?> deleteAdmin(
            @PathVariable Long id
    ) {

        User admin =
                userRepository.findById(id)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin not found."
                                )
                        );

        if (admin.getRole() != UserRole.ADMIN) {

            return ResponseEntity.badRequest().body(
                    "Only admin accounts can be deleted."
            );
        }

        userRepository.delete(admin);

        log.info(
                "Admin deleted: {}",
                admin.getEmail()
        );

        return ResponseEntity.ok(
                "Admin deleted successfully."
        );
    }
}