package com.arushugal.portfolio.domain;

import java.util.List;

/**
 * A single project entry.
 *
 * <p>Mirrors an element of the {@code GET /api/projects} JSON contract
 * (Requirements 1.3, 6.x).</p>
 */
public record Project(
        String id,
        String title,
        List<String> technologies,
        List<String> descriptionPoints,
        String repositoryUrl
) {
}
