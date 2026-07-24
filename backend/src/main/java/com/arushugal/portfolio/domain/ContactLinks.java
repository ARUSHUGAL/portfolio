package com.arushugal.portfolio.domain;

/**
 * Contact links for the {@link About} section.
 *
 * <p>Mirrors the nested {@code links} object of the {@code GET /api/about} JSON contract.</p>
 */
public record ContactLinks(
        String github,
        String linkedin,
        String email
) {
}
