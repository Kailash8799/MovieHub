package com.kailash.moviehub.exception;

import java.io.Serial;

public class ResourceNotFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1234567L;
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
