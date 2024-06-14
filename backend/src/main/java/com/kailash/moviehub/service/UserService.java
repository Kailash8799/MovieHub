package com.kailash.moviehub.service;

import com.kailash.moviehub.model.User;
import com.kailash.moviehub.repositories.UserRepository;
import com.kailash.moviehub.service.IService.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public String signIn() {
    User newuser = new User();
    newuser.setEmail("abc@gmai.conm");
    newuser.setPassword("234rtfv");
    userRepository.save(newuser);
    return null;
  }

  @Override
  public boolean signUp() {
    throw new UnsupportedOperationException("Unimplemented method 'signUp'");
  }

  @Override
  public boolean forgotPassword() {
    throw new UnsupportedOperationException(
      "Unimplemented method 'forgotPassword'"
    );
  }

  @Override
  public boolean updatePassword() {
    throw new UnsupportedOperationException(
      "Unimplemented method 'updatePassword'"
    );
  }
}
