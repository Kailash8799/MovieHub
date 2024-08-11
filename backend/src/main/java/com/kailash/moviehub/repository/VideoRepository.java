package com.kailash.moviehub.repository;

import com.kailash.moviehub.model.Video;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, UUID> {}
