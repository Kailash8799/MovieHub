package com.kailash.moviehub.service.impl;

import com.kailash.moviehub.model.User;
import com.kailash.moviehub.repository.UserRepository;
import com.kailash.moviehub.service.UserService;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public User getUserForAuth(String email) {
    Optional<User> user = this.userRepository.findByEmail(email);
    return user.orElse(new User());
  }

  @Override
  public User getUserForJwtAuth(String email) {
    Optional<User> user = this.userRepository.findByEmail(email);
    return user.orElse(null);
  }
}
