package com.roadcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Entry point for the RoadCare Spring Boot application.
 *
 * RoadCare is a smart pothole reporting system that allows citizens
 * to submit and track road complaints, and enables admins/officers
 * to manage and resolve those complaints efficiently.
 *
 * Base package: com.roadcare
 * Server port:  8080 (configured in application.properties)
 * Database:     MySQL — roadcare_db
 *
 * @EnableAsync — enables asynchronous email dispatch in EmailService.
 */
@SpringBootApplication
@EnableAsync
public class RoadCareApplication {

    public static void main(String[] args) {
        SpringApplication.run(RoadCareApplication.class, args);
    }
}