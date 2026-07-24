package com.arushugal.portfolio.domain;

/**
 * The sanitized, domain form of a contact form submission (Requirements 2.1, 2.8).
 *
 * <p>Distinct from the inbound {@code ContactRequest} DTO: this represents the
 * trimmed and HTML-escaped values after validation and sanitization, ready for
 * server-side processing (log-only per the design).</p>
 */
public record ContactSubmission(
        String name,
        String email,
        String message
) {
}
