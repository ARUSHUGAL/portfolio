package com.arushugal.portfolio.domain;

import java.util.List;

/**
 * A single professional experience entry.
 *
 * <p>Mirrors an element of the {@code GET /api/experience} JSON contract
 * (Requirements 1.2, 5.x). {@code startDate} and {@code endDate} use the
 * {@code "YYYY-MM"} string format; {@code endDate} is {@code null} for a
 * current position.</p>
 */
public record Experience(
        String id,
        String organization,
        String role,
        String location,
        String startDate,
        String endDate,
        boolean current,
        List<String> descriptionPoints
) {
}
