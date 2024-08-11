package com.kailash.moviehub.controller;

import com.kailash.moviehub.dto.UserLoginRequestDTO;
import com.kailash.moviehub.dto.UserSignUpRequestDTO;
import com.kailash.moviehub.service.AuthService;
import com.kailash.moviehub.utils.ApiResponse;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/signin")
  public ResponseEntity<ApiResponse<Object>> signIn(
    @Valid @RequestBody UserLoginRequestDTO userLoginRequestDTO
  ) {
    String token = this.authService.signIn(userLoginRequestDTO);
    Map<String, String> data = Map.of("token", token);
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "User login successful",
      true,
      data
    );
    return ResponseEntity.ok(response); // 200 OK
  }

  @PostMapping("/signup")
  public ResponseEntity<ApiResponse<Object>> signUp(
    @Valid @RequestBody UserSignUpRequestDTO userSignUpRequestDTO
  ) {
    this.authService.signUp(userSignUpRequestDTO);
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "User created successfully",
      true,
      null
    );
    return ResponseEntity.status(201).body(response); // 201 Created
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<ApiResponse<Object>> forgotPassword(
    @Valid @RequestBody Map<String, String> request
  ) {
    String email = request.get("email");
    String password = request.get("password");
    Map<String, String> result = new HashMap<String, String>();
    result.put("email", email);
    result.put("password", password);
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "User profile",
      true,
      result
    );
    return ResponseEntity.ok(response);
  }

  @PostMapping("/update-password")
  public ResponseEntity<ApiResponse<Object>> updatePassword() {
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "User profile",
      true,
      null
    );
    return ResponseEntity.ok(response);
  }
}
