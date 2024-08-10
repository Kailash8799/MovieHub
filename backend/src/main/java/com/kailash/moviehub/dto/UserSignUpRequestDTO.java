package com.kailash.moviehub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserSignUpRequestDTO {

  @Email(message = "Invalid Email address, Please Input valid Email!")
  public String email;

  @NotEmpty
  @Size(min = 6, max = 16, message = "Input password within 6 to 16 Characters")
  public String password;
}
