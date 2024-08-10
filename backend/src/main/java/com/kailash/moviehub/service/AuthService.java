package com.kailash.moviehub.service;

import com.kailash.moviehub.dto.UserLoginRequestDTO;
import com.kailash.moviehub.dto.UserSignUpRequestDTO;

public interface AuthService {
    String signIn(UserLoginRequestDTO userLoginRequestDTO);

    void signUp(UserSignUpRequestDTO userSignUpRequestDTO);

    boolean forgotPassword();

    boolean updatePassword();
}
