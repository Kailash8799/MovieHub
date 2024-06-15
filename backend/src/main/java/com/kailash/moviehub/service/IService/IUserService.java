package com.kailash.moviehub.service.IService;

import com.kailash.moviehub.model.Dto.UserDTO;
import com.kailash.moviehub.model.Dto.UserLoginRequestDTO;
import com.kailash.moviehub.model.Dto.UserSignUpRequestDTO;

public interface IUserService {
  public UserDTO signIn(UserLoginRequestDTO userLoginRequestDTO);

  public boolean signUp(UserSignUpRequestDTO userSignUpRequestDTO);

  public boolean forgotPassword();

  public boolean updatePassword();
}
