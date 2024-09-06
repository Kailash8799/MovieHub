package com.kailash.moviehub.service.impl;

import com.kailash.moviehub.dto.UserLoginRequestDTO;
import com.kailash.moviehub.dto.UserSignUpRequestDTO;
import com.kailash.moviehub.model.User;
import com.kailash.moviehub.repository.UserRepository;
import com.kailash.moviehub.service.AuthService;
import com.kailash.moviehub.utils.ModelMapper;
import com.kailash.moviehub.utils.jwt.JwtUtils;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;

  public AuthServiceImpl(
    UserRepository userRepository,
    PasswordEncoder passwordEncoder,
    AuthenticationManager authenticationManager,
    JwtUtils jwtUtils
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
  }

  @Override
  public String signIn(UserLoginRequestDTO userLoginRequestDTO) {
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        userLoginRequestDTO.getEmail(),
        userLoginRequestDTO.getPassword()
      )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    User user = (User) authentication.getPrincipal();
    return jwtUtils.generateToken(user);
  }

  @Override
  @Transactional
  public void signUp(UserSignUpRequestDTO userLoginRequestDTO) {
    User user = ModelMapper.signUpDtoToUser(userLoginRequestDTO);
    user.setPassword(passwordEncoder.encode(userLoginRequestDTO.getPassword()));
    userRepository.save(user);
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
