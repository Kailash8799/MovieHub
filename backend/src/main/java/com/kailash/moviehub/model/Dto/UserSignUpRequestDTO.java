package com.kailash.moviehub.model.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class UserSignUpRequestDTO {

  @Email(message = "Invalid Email address, Please Input valid Email!")
  public String email;

  @NotEmpty
  @Size(min = 6, max = 16, message = "Input password within 6 to 16 Characters")
  public String password;
}
