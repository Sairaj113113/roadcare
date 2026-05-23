package com.roadcare.security;

import com.roadcare.entity.User;
import com.roadcare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Spring Security UserDetailsService implementation for RoadCare.
 *
 * Loads a User entity from the database by email and converts it
 * into Spring Security's UserDetails format.
 *
 * Role mapping:
 *
 * USER         -> ROLE_USER
 * ADMIN        -> ROLE_ADMIN
 * SUPER_ADMIN  -> ROLE_SUPER_ADMIN
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Load user by email address.
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)

                .orElseThrow(() -> {

                    log.warn(
                            "User not found with email: {}",
                            email
                    );

                    return new UsernameNotFoundException(
                            "User not found with email: " + email
                    );
                });

        // =========================================================
        // CONVERT ROLE TO SPRING SECURITY AUTHORITY
        // =========================================================

        String roleAuthority =
                "ROLE_" + user.getRole().name();

        return org.springframework.security.core.userdetails.User.builder()

                .username(user.getEmail())

                .password(user.getPassword())

                .authorities(
                        List.of(
                                new SimpleGrantedAuthority(roleAuthority)
                        )
                )

                .accountExpired(false)

                .accountLocked(false)

                .credentialsExpired(false)

                .disabled(false)

                .build();
    }
}