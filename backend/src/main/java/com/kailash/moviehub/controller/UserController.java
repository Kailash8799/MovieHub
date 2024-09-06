package com.kailash.moviehub.controller;

import com.kailash.moviehub.service.UserService;
import com.kailash.moviehub.utils.ApiResponse;
import com.kailash.moviehub.utils.WithRateLimitProtection;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  @SuppressWarnings("unused")
  @Autowired
  private UserService userService;

  @GetMapping(
    value = "/profile/{userId}",
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @PreAuthorize("hasRole('USER')")
  @WithRateLimitProtection
  public ResponseEntity<ApiResponse<String>> getProfile(
    @PathVariable UUID userId
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
  @PreAuthorize("hasRole('USER')")
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
  @PreAuthorize("hasRole('USER')")
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
