package com.kailash.moviehub.exception;

import com.kailash.moviehub.utils.ApiResponse;
import java.util.HashMap;
import java.util.Map;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(
          ResourceNotFoundException ex,
          WebRequest request
  ) {
    ApiResponse<Object> response = new ApiResponse<>(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            false,
            null
    );
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ApiResponse<Object>> handleBadRequestException(
          BadRequestException ex,
          WebRequest request
  ) {
    ApiResponse<Object> response = new ApiResponse<>(
            HttpStatus.BAD_REQUEST.value(),
            ex.getMessage(),
            false,
            null
    );
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<ApiResponse<Object>> handleDataIntegrityViolationException(
          DataIntegrityViolationException ex
  ) {
    String message =
            "Duplicate entry. The provided email or username already exists.";
    ApiResponse<Object> response = new ApiResponse<>(
            409, // Conflict
            message,
            false,
            null
    );
    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Object>> handleValidationExceptions(
          MethodArgumentNotValidException ex
  ) {
    Map<String, String> errors = new HashMap<>();
    for (FieldError error : ex.getBindingResult().getFieldErrors()) {
      errors.put(error.getField(), error.getDefaultMessage());
    }
    ApiResponse<Object> apiResponse = new ApiResponse<>(
            400,
            "Validation Failed",
            false,
            errors
    );
    return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<ApiResponse<Object>> handleHttpMessageNotReadableException(
          HttpMessageNotReadableException ex,
          WebRequest request
  ) {
    ApiResponse<Object> response = new ApiResponse<>(
            HttpStatus.BAD_REQUEST.value(),
            "Required request body is missing",
            false,
            null
    );
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ApiResponse<Object>> handleAccessDeniedException(
          AccessDeniedException ex,
          WebRequest request
  ) {
    ApiResponse<Object> response = new ApiResponse<>(
            HttpStatus.FORBIDDEN.value(),
            "Access Denied",
            false,
            null
    );
    return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Object>> handleAllExceptions(
          Exception ex,
          WebRequest request
  ) {
    ApiResponse<Object> response = new ApiResponse<>(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            ex.getMessage(),
            false,
            null
    );
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}