package com.arushugal.portfolio.domain;

/**
 * About content for the portfolio.
 *
 * <p>Mirrors the {@code GET /api/about} JSON contract (Requirement 1.1).</p>
 */
public record About(
        String name,
        String title,
        String location,
        String summary,
        ContactLinks links
) {
}
