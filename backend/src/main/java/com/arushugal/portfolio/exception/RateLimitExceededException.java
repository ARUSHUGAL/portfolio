package com.arushugal.portfolio.exception;

/**
 * Thrown when a client exceeds the contact submission rate limit (Requirement 2.7).
 *
 * <p>Normalized by the global exception handler into a {@code 429} {@link
 * com.arushugal.portfolio.dto.ApiError}. In practice the {@code RateLimitFilter}
 * writes the 429 response directly, but this type exists so the same error shape
 * can be produced from controller/service layers if needed.</p>
 */
public class RateLimitExceededException extends RuntimeException {

    public RateLimitExceededException(String message) {
        super(message);
    }
}
