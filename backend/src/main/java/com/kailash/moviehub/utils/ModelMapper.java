package com.kailash.moviehub.utils;

import com.kailash.moviehub.dto.UserDTO;
import com.kailash.moviehub.dto.UserSignUpRequestDTO;
import com.kailash.moviehub.dto.video.VideoDTO;
import com.kailash.moviehub.dto.video.VideoSaveRequestDTO;
import com.kailash.moviehub.model.User;
import com.kailash.moviehub.model.Video;
import java.util.List;
import java.util.stream.Collectors;

public class ModelMapper {

  public static void loginDtoToUser() {}

  public static User signUpDtoToUser(
    UserSignUpRequestDTO userSignUpRequestDTO
  ) {
    User user = new User();
    user.setEmail(userSignUpRequestDTO.getEmail());
    user.setPassword(userSignUpRequestDTO.getPassword());
    return user;
  }

  public static UserDTO userToUserDto(User user) {
    if (user == null) {
      return null;
    }
    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setName(user.getName());
    userDTO.setMobileNumber(user.getMobileNumber());
    return userDTO;
  }

  public static Video toVideo(VideoSaveRequestDTO videoSaveRequestDTO) {
    if (videoSaveRequestDTO == null) return null;
    Video video = new Video();
    video.setTitle(videoSaveRequestDTO.title());
    video.setDescription(videoSaveRequestDTO.description());
    return video;
  }

  public static VideoDTO toVideoDto(Video video) {
    if (video == null) return null;
    VideoDTO videoDTO = new VideoDTO(
      video.getId(),
      video.getTitle(),
      video.getDescription(),
      video.getUrl(),
      video.getCreatedAt()
    );
    return videoDTO;
  }

  public static List<VideoDTO> toVideoDtoList(List<Video> videos) {
    if (videos == null) return null;
    return videos
      .stream()
      .map(ModelMapper::toVideoDto)
      .collect(Collectors.toList());
  }
}
