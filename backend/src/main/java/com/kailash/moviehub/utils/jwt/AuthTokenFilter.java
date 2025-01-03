package com.kailash.moviehub.utils.jwt;

import com.kailash.moviehub.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserService userService;

  public AuthTokenFilter() {}

  @Override
  protected void doFilterInternal(
    @NonNull HttpServletRequest request,
    @NonNull HttpServletResponse response,
    @NonNull FilterChain filterChain
  ) throws ServletException, IOException {
    String jwtToken = parseJwt(request);
    if (
      jwtToken != null &&
      jwtUtils.validateToken(jwtToken) &&
      SecurityContextHolder.getContext().getAuthentication() == null
    ) {
      String email = (String) jwtUtils.getEmailFromToken(jwtToken);
      UserDetails userDetails = userService.getUserForJwtAuth(email);
      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
        userDetails,
        null,
        userDetails.getAuthorities()
      );
      System.out.println(authentication);
      authentication.setDetails(
        new WebAuthenticationDetailsSource().buildDetails(request)
      );
      SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    filterChain.doFilter(request, response);
  }

  private String parseJwt(HttpServletRequest request) {
    return jwtUtils.getJwtTokenFromHeader(request);
  }
}
