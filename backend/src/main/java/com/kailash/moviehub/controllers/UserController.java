package com.kailash.moviehub.controllers;

import com.kailash.moviehub.model.Dto.UserDTO;
import com.kailash.moviehub.model.Dto.UserLoginRequestDTO;
import com.kailash.moviehub.model.Dto.UserSignUpRequestDTO;
import com.kailash.moviehub.service.UserService;
import com.kailash.moviehub.utils.ApiResponse;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("/signin")
  public ResponseEntity<ApiResponse<Object>> signIn(
    @Valid @RequestBody UserLoginRequestDTO userLoginRequestDTO
  ) {
    UserDTO result = this.userService.signIn(userLoginRequestDTO);
    if (result == null) {
      ApiResponse<Object> response = new ApiResponse<Object>(
        400,
        "Failed to sign in user. Please try again.",
        false,
        null
      );
      return ResponseEntity.badRequest().body(response); // 400 Bad Request
    }

    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "User login successful",
      true,
      result
    );
    return ResponseEntity.ok(response); // 200 OK
  }

  @PostMapping("/signup")
  public ResponseEntity<ApiResponse<Object>> signUp(
    @Valid @RequestBody UserSignUpRequestDTO userSignUpRequestDTO
  ) {
    boolean result = this.userService.signUp(userSignUpRequestDTO);
    if (!result) {
      ApiResponse<Object> response = new ApiResponse<Object>(
        400,
        "Failed to create user. Please try again.",
        false,
        null
      );
      return ResponseEntity.badRequest().body(response); // 400 Bad Request
    }

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

  @GetMapping(
    value = "/profile/{userId}",
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<ApiResponse<String>> getProfile(
    @PathVariable("userId") UUID userId
  ) {
    ApiResponse<String> response = new ApiResponse<String>(
      200,
      "User profile",
      true,
      "All users"
    );
    return ResponseEntity.ok(response); // 200 OK
  }

  @PatchMapping("/profile/{userId}")
  public ResponseEntity<ApiResponse<Object>> updateProfile(
    @PathVariable("userId") UUID userId
  ) {
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "User profile",
      true,
      null
    );
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/profile/{userId}")
  public ResponseEntity<ApiResponse<Object>> deleteProfile(
    @PathVariable("userId") UUID userId
  ) {
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "User profile",
      true,
      null
    );
    return ResponseEntity.ok(response);
  }
}
