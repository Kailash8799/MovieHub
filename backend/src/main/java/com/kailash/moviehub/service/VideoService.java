package com.kailash.moviehub.service;

import com.kailash.moviehub.dto.video.VideoDTO;
import com.kailash.moviehub.dto.video.VideoSaveRequestDTO;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

public interface VideoService {
  void save(VideoSaveRequestDTO videoSaveRequest, MultipartFile videoFile);
  VideoDTO getVideoById(UUID videoId);
  ResponseEntity<StreamingResponseBody> streamVideo(
    String filename,
    String rangeHeader
  );
  VideoDTO filterVideo();
  List<VideoDTO> getAll();
}
