package com.cheemcheem.projects.cardgames.model;

import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Hand {

  @GeneratedValue
  @Id
  private Long id;

  @ElementCollection
  private List<Card> hand;
}
