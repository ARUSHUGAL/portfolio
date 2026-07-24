package com.arushugal.portfolio.domain;

/**
 * A language and its proficiency level.
 *
 * <p>Mirrors an element of the {@code languages} array in the
 * {@code GET /api/education} JSON contract (Requirement 9.2).</p>
 */
public record Language(
        String language,
        String proficiency
) {
}
