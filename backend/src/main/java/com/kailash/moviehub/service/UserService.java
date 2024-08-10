package com.kailash.moviehub.service;

import com.kailash.moviehub.model.User;

public interface UserService {
    User getUserForAuth(String email);
}
