package com.kailash.moviehub.model.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserLoginRequestDTO {

  @Email(message = "Invalid Email address, Please Input valid Email!")
  @NotEmpty(message = "Email cannot be empty")
  private String email;

  @NotEmpty(message = "Password cannot be empty")
  @Size(min = 6, max = 16, message = "Input password within 6 to 16 Characters")
  private String password;
}
