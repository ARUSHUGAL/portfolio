package com.arushugal.portfolio.dto;

import java.time.Instant;
import java.util.List;

/**
 * Standard error response shape returned for all error responses
 * (Requirements 1.8, 2.2, 2.3, 2.4, 2.7).
 *
 * <p>A single, consistent contract normalized by the global exception handler
 * across 400/404/429/500 responses. {@code fieldErrors} is empty for errors that
 * are not field-level validation failures.</p>
 */
public record ApiError(
        Instant timestamp,
        int status,
        String error,
        String message,
        List<FieldError> fieldErrors,
        String path
) {

    /**
     * A single field-level validation failure.
     */
    public record FieldError(
            String field,
            String message
    ) {
    }

    /**
     * Convenience factory for errors without field-level details (404/429/500).
     */
    public static ApiError of(int status, String error, String message, String path) {
        return new ApiError(Instant.now(), status, error, message, List.of(), path);
    }

    /**
     * Convenience factory for field-level validation errors (400).
     */
    public static ApiError of(int status, String error, String message,
                              List<FieldError> fieldErrors, String path) {
        return new ApiError(Instant.now(), status, error, message, fieldErrors, path);
    }
}
