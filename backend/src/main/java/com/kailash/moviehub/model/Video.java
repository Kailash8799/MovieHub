package com.kailash.moviehub.model;

import com.kailash.moviehub.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "video")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Video extends BaseEntity {

  private String title;
  private String description;
  private String url;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
  // @ManyToOne
  // @JoinColumn(name = "category_id")
  // private Category category;

  // @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
  // private Set<Comment> comments;
}
