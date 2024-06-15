package com.kailash.moviehub.service;

import com.kailash.moviehub.model.Dto.UserDTO;
import com.kailash.moviehub.model.Dto.UserLoginRequestDTO;
import com.kailash.moviehub.model.Dto.UserSignUpRequestDTO;
import com.kailash.moviehub.model.User;
import com.kailash.moviehub.model.UserRole;
import com.kailash.moviehub.repositories.UserRepository;
import com.kailash.moviehub.service.IService.IUserService;
import com.kailash.moviehub.utils.ModelMapper;
import java.util.Optional;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

  private final UserRepository userRepository;

  // private final PasswordEncoder passwordEncoder;

  public UserService(
    UserRepository userRepository
    // PasswordEncoder passwordEncoder
  ) {
    this.userRepository = userRepository;
    // this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDTO signIn(UserLoginRequestDTO userLoginRequestDTO) {
    Optional<User> user =
      this.userRepository.findByEmail(userLoginRequestDTO.getEmail());
    if (user.isPresent()) {
      //   if (
      //     this.passwordEncoder.matches(
      //         userLoginRequestDTO.password,
      //         user.get().getPassword()
      //       )
      //   ) {
      return ModelMapper.userToUserDto(user.get());
      //   }
    }
    throw new RuntimeException("Invalid email or password");
  }

  @Override
  public boolean signUp(UserSignUpRequestDTO userLoginRequestDTO) {
    User user = ModelMapper.signUpDtoToUser(userLoginRequestDTO);
    user.setPassword(userLoginRequestDTO.getPassword());
    user.setRole(UserRole.USER);
    this.userRepository.save(user);
    return true;
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
