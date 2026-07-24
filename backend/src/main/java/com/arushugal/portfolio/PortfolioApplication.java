package com.arushugal.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the portfolio Backend_API.
 *
 * <p>Boots the Spring Boot application context that serves structured portfolio
 * content and accepts validated, rate-limited contact submissions.</p>
 */
@SpringBootApplication
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
    }
}
