package com.cheemcheem.projects.cardgames.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Player {

  @GeneratedValue
  @Id
  private Long id;

  private String userName;
}
