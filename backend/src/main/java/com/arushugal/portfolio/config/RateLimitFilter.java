package com.arushugal.portfolio.config;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.arushugal.portfolio.dto.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.bucket4j.Bucket;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Per-client-IP rate limiting for {@code POST /api/contact} (Requirement 2.7).
 *
 * <p>Maintains one Bucket4j token bucket per client IP. When a client exhausts
 * its bucket, the filter short-circuits with {@code 429 Too Many Requests} using
 * the standard {@link ApiError} JSON shape. All other requests pass through
 * untouched.</p>
 */
@Component
@Order(1)
public class RateLimitFilter extends OncePerRequestFilter {

    private static final String CONTACT_PATH = "/api/contact";

    private final RateLimitConfig rateLimitConfig;
    private final ObjectMapper objectMapper;
    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    public RateLimitFilter(RateLimitConfig rateLimitConfig, ObjectMapper objectMapper) {
        this.rateLimitConfig = rateLimitConfig;
        this.objectMapper = objectMapper;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Only rate-limit POST /api/contact.
        return !(HttpMethod.POST.matches(request.getMethod())
                && CONTACT_PATH.equals(request.getRequestURI()));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String clientKey = resolveClientIp(request);
        Bucket bucket = buckets.computeIfAbsent(clientKey, k -> rateLimitConfig.newBucket());

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            writeTooManyRequests(request, response);
        }
    }

    private void writeTooManyRequests(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        long windowMinutes = rateLimitConfig.getWindow().toMinutes();
        ApiError body = new ApiError(
                Instant.now(),
                HttpStatus.TOO_MANY_REQUESTS.value(),
                HttpStatus.TOO_MANY_REQUESTS.getReasonPhrase(),
                "Too many contact submissions. Please try again in a few minutes.",
                List.of(),
                request.getRequestURI());

        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setHeader(HttpHeaders.RETRY_AFTER, String.valueOf(windowMinutes * 60));
        objectMapper.writeValue(response.getWriter(), body);
    }

    private static String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            // First hop is the originating client.
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
