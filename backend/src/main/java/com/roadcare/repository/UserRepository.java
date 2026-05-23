package com.roadcare.repository;

import com.roadcare.entity.User;
import com.roadcare.entity.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity.
 * Provides database operations on the 'users' table.
 * Used by AuthService for registration, login, and user lookups.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by their email address.
     * Used during login and to check for duplicate registrations.
     */
    Optional<User> findByEmail(String email);

    /**
     * Check whether a user with the given email already exists.
     * Used during registration to prevent duplicate accounts.
     */
    boolean existsByEmail(String email);

    /**
     * Find a user by email and role.
     * Used for admin login to ensure only ADMIN-role users can access the admin panel.
     */
    Optional<User> findByEmailAndRole(String email, UserRole role);
}