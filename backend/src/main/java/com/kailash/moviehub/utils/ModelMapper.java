package com.kailash.moviehub.utils;

import com.kailash.moviehub.model.Dto.UserDTO;
import com.kailash.moviehub.model.Dto.UserSignUpRequestDTO;
import com.kailash.moviehub.model.User;

public class ModelMapper {

  public static void loginDtoToUser() {}

  public static User signUpDtoToUser(
    UserSignUpRequestDTO userSignUpRequestDTO
  ) {
    User user = new User();
    user.setEmail(userSignUpRequestDTO.getEmail());
    user.setPassword(userSignUpRequestDTO.getPassword());
    return user;
  }

  public static UserDTO userToUserDto(User user) {
    if (user == null) {
      return null;
    }
    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setName(user.getName());
    userDTO.setMobileNumber(user.getMobileNumber());
    userDTO.setRole(user.getRole());
    return userDTO;
  }
}
