package com.arushugal.portfolio.domain;

import java.util.List;

/**
 * Aggregate payload for the {@code GET /api/education} JSON contract
 * (Requirements 1.6, 9.1, 9.2, 9.3).
 *
 * <p>Groups the education entries, spoken languages, and leadership
 * activities into the single object shape returned by the endpoint.</p>
 */
public record EducationResponse(
        List<Education> education,
        List<Language> languages,
        List<String> leadership
) {
}
