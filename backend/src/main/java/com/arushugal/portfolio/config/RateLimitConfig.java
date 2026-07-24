package com.arushugal.portfolio.config;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;

/**
 * Rate-limit settings for contact submissions (Requirement 2.7).
 *
 * <p>Reads the limit and window from the environment-backed properties
 * {@code portfolio.contact.rate-limit} ({@code PORTFOLIO_CONTACT_RATE_LIMIT},
 * default 5) and {@code portfolio.contact.rate-window-minutes}
 * ({@code PORTFOLIO_CONTACT_RATE_WINDOW_MINUTES}, default 10). Produces a fresh
 * Bucket4j {@link Bucket} per client IP with a fixed-window refill.</p>
 */
@Component
public class RateLimitConfig {

    private final long capacity;
    private final Duration window;

    public RateLimitConfig(
            @Value("${portfolio.contact.rate-limit}") long capacity,
            @Value("${portfolio.contact.rate-window-minutes}") long windowMinutes) {
        this.capacity = capacity;
        this.window = Duration.ofMinutes(windowMinutes);
    }

    /**
     * @return a new token bucket configured with the current limit/window
     */
    public Bucket newBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(capacity)
                .refillIntervally(capacity, window)
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    public long getCapacity() {
        return capacity;
    }

    public Duration getWindow() {
        return window;
    }
}
