package com.kailash.moviehub.dto;

import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {

  private UUID id;

  private String email;

  private String name;

  private String mobileNumber;
}
