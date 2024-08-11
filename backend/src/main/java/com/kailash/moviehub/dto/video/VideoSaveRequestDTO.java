package com.kailash.moviehub.dto.video;

import jakarta.validation.constraints.NotEmpty;

public record VideoSaveRequestDTO(
  @NotEmpty(message = "Title is required!") String title,
  @NotEmpty(message = "Description is required!") String description
) {}
