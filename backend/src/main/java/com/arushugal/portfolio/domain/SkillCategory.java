package com.arushugal.portfolio.domain;

import java.util.List;

/**
 * A category of skills.
 *
 * <p>Mirrors an element of the {@code GET /api/skills} JSON contract
 * (Requirements 1.4, 7.x).</p>
 */
public record SkillCategory(
        String category,
        List<String> skills
) {
}
