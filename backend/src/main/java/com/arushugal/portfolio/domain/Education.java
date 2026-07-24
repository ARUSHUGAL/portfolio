package com.arushugal.portfolio.domain;

import java.util.List;

/**
 * A single education entry.
 *
 * <p>Mirrors an element of the {@code education} array in the
 * {@code GET /api/education} JSON contract (Requirements 1.6, 9.1).
 * {@code startDate} and {@code endDate} use the {@code "YYYY-MM"} string
 * format.</p>
 */
public record Education(
        String institution,
        String school,
        String degree,
        String startDate,
        String endDate,
        String gpa,
        List<String> honors
) {
}
