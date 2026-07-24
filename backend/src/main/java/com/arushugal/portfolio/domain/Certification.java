package com.arushugal.portfolio.domain;

/**
 * A single certification entry.
 *
 * <p>Mirrors an element of the {@code GET /api/certifications} JSON contract
 * (Requirements 1.5, 8.x). {@code issueDate} uses the {@code "YYYY-MM"} string
 * format.</p>
 */
public record Certification(
        String id,
        String title,
        String issuer,
        String issueDate,
        String credentialId
) {
}
