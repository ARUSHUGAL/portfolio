package com.arushugal.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS configuration (Requirements 1.9, 17.2).
 *
 * <p>Reads the permitted Frontend_App origin from the environment-backed property
 * {@code portfolio.cors.allowed-origin} ({@code PORTFOLIO_CORS_ALLOWED_ORIGIN})
 * and applies it globally for the allowed methods {@code GET, POST, OPTIONS} and
 * the {@code Content-Type} header.</p>
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    private final String allowedOrigin;

    public CorsConfig(@Value("${portfolio.cors.allowed-origin}") String allowedOrigin) {
        this.allowedOrigin = allowedOrigin;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigin)
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("Content-Type");
    }
}
