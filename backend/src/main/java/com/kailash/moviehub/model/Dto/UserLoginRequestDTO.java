package com.kailash.moviehub.model.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserLoginRequestDTO {

  public String email;
  public String name;
}
