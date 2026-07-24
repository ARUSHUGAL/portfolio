package com.arushugal.portfolio.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arushugal.portfolio.dto.ContactRequest;
import com.arushugal.portfolio.dto.ContactResponse;
import com.arushugal.portfolio.service.ContactService;

import jakarta.validation.Valid;

/**
 * Contact endpoint (Requirement 2.1).
 *
 * <p>{@code POST /api/contact} binds and validates a {@link ContactRequest}. On
 * success it returns {@code 200 OK} with a {@link ContactResponse}. Validation
 * failures, rate-limit exhaustion, and unexpected errors are normalized by the
 * global exception handler.</p>
 */
@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    /** {@code POST /api/contact} (Requirement 2.1). */
    @PostMapping(path = "/contact", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ContactResponse submit(@Valid @RequestBody ContactRequest request) {
        return contactService.submit(request);
    }
}
