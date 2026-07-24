package com.arushugal.portfolio.dto;

/**
 * Confirmation payload returned by {@code POST /api/contact} on success
 * (Requirement 2.1).
 */
public record ContactResponse(
        String status,
        String message
) {
}
