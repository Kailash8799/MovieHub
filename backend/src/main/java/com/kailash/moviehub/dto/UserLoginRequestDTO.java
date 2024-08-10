package com.kailash.moviehub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRequestDTO {

  @Email(message = "Invalid Email address, Please Input valid Email!")
  @NotEmpty(message = "Email cannot be empty")
  private String email;

  @NotEmpty(message = "Password cannot be empty")
  @Size(min = 6, max = 16, message = "Input password within 6 to 16 Characters")
  private String password;
}
