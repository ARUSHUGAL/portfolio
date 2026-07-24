package com.arushugal.portfolio.exception;

/**
 * Thrown when a requested resource does not exist (Requirement 1.8).
 *
 * <p>Normalized by the global exception handler into a {@code 404} {@link
 * com.arushugal.portfolio.dto.ApiError}.</p>
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
