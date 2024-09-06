package com.kailash.moviehub.utils;

import com.kailash.moviehub.exception.RateLimitException;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class RateLimitAspect {

  public static final String ERROR_MESSAGE =
    "To many request at endpoint %s from IP %s! Please try again after %d milliseconds!";

  @Value("${spring.app.rate.limit:#{5}}")
  private int rateLimit;

  @Value("${spring.app.rate.durationinms:#{60000}}")
  private long rateDuration;

  private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

  /**
   * Executed by each call of a method annotated with {@link WithRateLimitProtection} which should be an HTTP endpoint.
   * Counts calls per remote address. Calls older than {@link #rateDuration} milliseconds will be forgotten. If there have
   * been more than {@link #rateLimit} calls within {@link #rateDuration} milliseconds from a remote address, a {@link RateLimitException}
   * will be thrown.
   * @throws RateLimitException iff rate limit for a given remote address has been exceeded
   */
  @Before("@annotation(com.kailash.moviehub.utils.WithRateLimitProtection)")
  public void rateLimit() {
    final ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
    final String key = requestAttributes.getRequest().getRemoteAddr();
    Bucket bucket = getBucket(key);

    if (!bucket.tryConsume(1)) {
      throw new RateLimitException(
        String.format(
          ERROR_MESSAGE,
          requestAttributes.getRequest().getRequestURI(),
          key,
          rateDuration
        )
      );
    }
  }

  private Bucket getBucket(String key) {
    return buckets.computeIfAbsent(key, k -> createBucket());
  }

  private Bucket createBucket() {
    Bandwidth limit = Bandwidth
      .builder()
      .capacity(rateLimit)
      .refillIntervally(1, Duration.ofMillis(rateDuration))
      .build();
    Bucket bucket = Bucket.builder().addLimit(limit).build();
    return bucket;
  }
}
