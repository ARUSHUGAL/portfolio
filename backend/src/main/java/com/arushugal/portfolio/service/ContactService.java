package com.arushugal.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.arushugal.portfolio.domain.ContactSubmission;
import com.arushugal.portfolio.dto.ContactRequest;
import com.arushugal.portfolio.dto.ContactResponse;

/**
 * Contact submission processing (Requirements 2.1, 2.8).
 *
 * <p>After Bean Validation has passed, this service trims and HTML-escapes every
 * string field (defense against stored/reflected injection on this public,
 * unauthenticated endpoint) and then processes the submission <strong>log-only
 * </strong>: the sanitized values are written to the server-side log. There is no
 * database persistence and no email delivery, per the design.</p>
 */
@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private static final String ACCEPTED_STATUS = "accepted";
    private static final String ACCEPTED_MESSAGE =
            "Thanks for reaching out. Your message has been received.";

    /**
     * Sanitizes and logs a validated contact submission.
     *
     * @param request the validated inbound request
     * @return an acceptance confirmation payload
     */
    public ContactResponse submit(ContactRequest request) {
        ContactSubmission submission = new ContactSubmission(
                sanitize(request.name()),
                sanitize(request.email()),
                sanitize(request.message()));

        // Log-only handling: no persistence, no email delivery.
        log.info("Contact submission received name=\"{}\" email=\"{}\" messageLength={} message=\"{}\"",
                submission.name(),
                submission.email(),
                submission.message().length(),
                submission.message());

        return new ContactResponse(ACCEPTED_STATUS, ACCEPTED_MESSAGE);
    }

    /**
     * Trims and HTML-escapes a string field, neutralizing {@code <}, {@code >},
     * {@code &}, {@code "}, and {@code '} (Requirement 2.8).
     *
     * @param value the raw value (assumed non-null after validation)
     * @return the trimmed, HTML-escaped value
     */
    static String sanitize(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        StringBuilder sb = new StringBuilder(trimmed.length());
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            switch (c) {
                case '&' -> sb.append("&amp;");
                case '<' -> sb.append("&lt;");
                case '>' -> sb.append("&gt;");
                case '"' -> sb.append("&quot;");
                case '\'' -> sb.append("&#39;");
                default -> sb.append(c);
            }
        }
        return sb.toString();
    }
}
