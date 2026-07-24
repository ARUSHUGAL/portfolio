package com.arushugal.portfolio.exception;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.arushugal.portfolio.dto.ApiError;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

/**
 * Normalizes all errors into the standard {@link ApiError} shape
 * (Requirements 1.8, 2.2, 2.3, 2.4, 2.7).
 *
 * <p>Handles Bean Validation failures (400 with populated {@code fieldErrors}),
 * missing resources (404), rate-limit exhaustion (429), and unexpected errors
 * (500 with a generic message that leaks no internal detail).</p>
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Request-body validation failures ({@code @Valid} on a {@code @RequestBody})
     * (Requirements 2.2, 2.3, 2.4).
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        List<ApiError.FieldError> fieldErrors = new ArrayList<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.add(new ApiError.FieldError(fe.getField(), fe.getDefaultMessage()));
        }

        ApiError body = ApiError.of(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Validation failed",
                fieldErrors,
                request.getRequestURI());
        return ResponseEntity.badRequest().body(body);
    }

    /**
     * Constraint violations (e.g. {@code @Validated} method parameters)
     * (Requirements 2.2, 2.3, 2.4).
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolation(
            ConstraintViolationException ex, HttpServletRequest request) {

        List<ApiError.FieldError> fieldErrors = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            String path = violation.getPropertyPath() == null
                    ? "" : violation.getPropertyPath().toString();
            // Use the leaf property name as the field.
            String field = path.contains(".") ? path.substring(path.lastIndexOf('.') + 1) : path;
            fieldErrors.add(new ApiError.FieldError(field, violation.getMessage()));
        }

        ApiError body = ApiError.of(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Validation failed",
                fieldErrors,
                request.getRequestURI());
        return ResponseEntity.badRequest().body(body);
    }

    /**
     * Explicit not-found resources (Requirement 1.8).
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFound(
            ResourceNotFoundException ex, HttpServletRequest request) {
        return notFound(ex.getMessage(), request);
    }

    /**
     * Unknown paths / unmatched routes (Requirement 1.8).
     *
     * <p>{@link NoResourceFoundException} is thrown by Spring 6.1+ when no static
     * resource matches; {@link NoHandlerFoundException} is thrown when
     * {@code throw-exception-if-no-handler-found} is enabled.</p>
     */
    @ExceptionHandler({NoResourceFoundException.class, NoHandlerFoundException.class})
    public ResponseEntity<ApiError> handleNotFound(Exception ex, HttpServletRequest request) {
        return notFound("The requested resource was not found", request);
    }

    /**
     * Rate-limit exhaustion (Requirement 2.7).
     */
    @ExceptionHandler(RateLimitExceededException.class)
    public ResponseEntity<ApiError> handleRateLimit(
            RateLimitExceededException ex, HttpServletRequest request) {

        ApiError body = ApiError.of(
                HttpStatus.TOO_MANY_REQUESTS.value(),
                HttpStatus.TOO_MANY_REQUESTS.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(body);
    }

    /**
     * Fallback for unexpected errors (Requirement 1.8). Emits a generic message so
     * no internal detail leaks; the real cause is logged server-side.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneric(Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception processing {} {}",
                request.getMethod(), request.getRequestURI(), ex);

        ApiError body = ApiError.of(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                "An unexpected error occurred",
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

    private ResponseEntity<ApiError> notFound(String message, HttpServletRequest request) {
        ApiError body = ApiError.of(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                message,
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }
}
