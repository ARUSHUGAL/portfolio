package com.arushugal.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Inbound contact form submission (Requirements 2.2, 2.3, 2.4).
 *
 * <p>Validated with Jakarta Bean Validation. Violations are normalized into an
 * {@link ApiError} with populated {@code fieldErrors} by the global exception
 * handler.</p>
 */
public record ContactRequest(

        @NotBlank(message = "must not be blank")
        @Size(max = 100, message = "must be at most 100 characters")
        String name,

        @NotBlank(message = "must not be blank")
        @Email(message = "must be a well-formed email address")
        @Size(max = 254, message = "must be at most 254 characters")
        String email,

        @NotBlank(message = "must not be blank")
        @Size(min = 1, max = 5000, message = "must be between 1 and 5000 characters")
        String message
) {
}
