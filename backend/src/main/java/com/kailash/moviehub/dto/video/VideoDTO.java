package com.kailash.moviehub.dto.video;

import java.time.LocalDateTime;
import java.util.UUID;

public record VideoDTO(
  UUID id,
  String title,
  String description,
  String url,
  LocalDateTime createdAt
) {}
