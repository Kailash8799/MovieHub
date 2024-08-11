package com.kailash.moviehub.controller;

import com.kailash.moviehub.dto.video.VideoDTO;
import com.kailash.moviehub.dto.video.VideoSaveRequestDTO;
import com.kailash.moviehub.service.VideoService;
import com.kailash.moviehub.utils.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@RestController
@RequestMapping("/api/v1/video")
public class VideoController {

  @Autowired
  private VideoService videoService;

  @PostMapping("/upload")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<Object>> saveVideo(
    @Valid @ModelAttribute VideoSaveRequestDTO videoSaveRequestDTO,
    @Valid @RequestParam("video") MultipartFile videoFile
  ) {
    this.videoService.save(videoSaveRequestDTO, videoFile);
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "Video uploaded successfully",
      true,
      null
    );
    return ResponseEntity.status(201).body(response);
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ApiResponse<Object>> getVideo(@PathVariable UUID id) {
    VideoDTO videoDTO = videoService.getVideoById(id);
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "Video retrieved successfully",
      true,
      videoDTO
    );
    return ResponseEntity.ok(response);
  }

  @GetMapping(value = "/stream/{filename:.+}")
  public ResponseEntity<StreamingResponseBody> streamVideo(
    @PathVariable String filename,
    @RequestHeader(value = HttpHeaders.RANGE, required = false) String range
  ) {
    return videoService.streamVideo(filename, range);
  }

  @GetMapping(value = "/all")
  public ResponseEntity<ApiResponse<Object>> getAllVideos() {
    List<VideoDTO> videoDTO = videoService.getAll();
    ApiResponse<Object> response = new ApiResponse<Object>(
      200,
      "All video retrieved successfully",
      true,
      videoDTO
    );
    return ResponseEntity.ok(response);
  }
}
