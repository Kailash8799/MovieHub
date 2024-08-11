package com.kailash.moviehub.service.impl;

import com.kailash.moviehub.dto.video.VideoDTO;
import com.kailash.moviehub.dto.video.VideoSaveRequestDTO;
import com.kailash.moviehub.exception.BadRequestException;
import com.kailash.moviehub.exception.ResourceNotFoundException;
import com.kailash.moviehub.model.User;
import com.kailash.moviehub.model.Video;
import com.kailash.moviehub.repository.VideoRepository;
import com.kailash.moviehub.service.VideoService;
import com.kailash.moviehub.utils.ModelMapper;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class VideoServiceImpl implements VideoService {

  @Value("${spring.servlet.multipart.location}")
  private String UPLOAD_DIR;

  private VideoRepository videoRepository;
  private ResourceLoader resourceLoader;

  public VideoServiceImpl(
    VideoRepository videoRepository,
    ResourceLoader resourceLoader
  ) {
    this.videoRepository = videoRepository;
    this.resourceLoader = resourceLoader;
  }

  @PostConstruct
  public void init() {
    File file = new File(UPLOAD_DIR);
    if (!file.exists()) file.mkdir();
  }

  @Override
  @Transactional
  public void save(
    VideoSaveRequestDTO videoSaveRequest,
    MultipartFile videoFile
  ) {
    if (videoFile.isEmpty()) throw new BadRequestException(
      "No file selected to upload."
    );
    String contentType = videoFile.getContentType();
    if (contentType == null || !contentType.startsWith("video/")) {
      throw new BadRequestException(
        "Invalid file type. Only video files are allowed."
      );
    }

    String fileUrl = null;
    try {
      String originalFilename = videoFile.getOriginalFilename();
      String uploadDIR = StringUtils.cleanPath(UPLOAD_DIR);
      String uniqueFilename =
        System.currentTimeMillis() + "_" + originalFilename;
      Path filePath = Paths.get(uploadDIR, uniqueFilename);

      Files.copy(videoFile.getInputStream(), filePath);
      fileUrl = uniqueFilename;
    } catch (IOException e) {
      throw new BadRequestException(e.getMessage());
    }

    User user = (User) SecurityContextHolder
      .getContext()
      .getAuthentication()
      .getPrincipal();
    Video video = ModelMapper.toVideo(videoSaveRequest);
    video.setUser(user);
    video.setUrl(fileUrl);
    videoRepository.saveAndFlush(video);
  }

  @Override
  public List<VideoDTO> getAll() {
    return ModelMapper.toVideoDtoList(videoRepository.findAll());
  }

  @Override
  public VideoDTO getVideoById(UUID videoId) {
    if (videoId == null) throw new BadRequestException("Invalid video path");
    Optional<Video> video = videoRepository.findById(videoId);
    if (!video.isPresent()) throw new BadRequestException("Video not found");
    return ModelMapper.toVideoDto(video.get());
  }

  @Override
  public VideoDTO filterVideo() {
    throw new UnsupportedOperationException(
      "Unimplemented method 'filterVideo'"
    );
  }

  @Override
  public ResponseEntity<Resource> streamVideo(
    String filename,
    String rangeHeader
  ) {
    Path videoPath = Paths.get(UPLOAD_DIR).resolve(filename);
    Resource resource = resourceLoader.getResource(
      "file:" + videoPath.toString()
    );
    if (!resource.exists()) {
      throw new ResourceNotFoundException(filename + " not found");
    }

    HttpHeaders headers = new HttpHeaders();
    headers.add(
      HttpHeaders.CONTENT_TYPE,
      MediaType.APPLICATION_OCTET_STREAM_VALUE
    );
    headers.add(
      HttpHeaders.CONTENT_DISPOSITION,
      "inline; filename=\"" + resource.getFilename() + "\""
    );

    return ResponseEntity.ok().headers(headers).body(resource);
  }
}
