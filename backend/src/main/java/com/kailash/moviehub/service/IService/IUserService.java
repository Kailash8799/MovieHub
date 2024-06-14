package com.kailash.moviehub.service.IService;

public interface IUserService {
  public String signIn();
  public boolean signUp();
  public boolean forgotPassword();
  public boolean updatePassword();
}
