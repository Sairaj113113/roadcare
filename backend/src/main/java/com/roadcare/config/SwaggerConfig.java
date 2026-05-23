package com.roadcare.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI roadCareOpenAPI() {

        return new OpenAPI()
                .info(
                        new Info()
                                .title("RoadCare API")
                                .description("RoadCare Smart Pothole Reporting System API")
                                .version("1.0")
                );
    }
}