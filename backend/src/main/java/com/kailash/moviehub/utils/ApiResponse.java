package com.kailash.moviehub.utils;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiResponse<T> {

    private int statusCode;
    private String message;
    private Boolean success;
    private T data;

    public ApiResponse(int statusCode, String message, Boolean success, T data) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = success;
        this.data = data;
    }

}
