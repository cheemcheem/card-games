package com.cheemcheem.projects.cardgames.model;

import java.util.List;
import java.util.Map;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Game {

  @OneToMany(cascade = CascadeType.ALL)
  private Map<String, Hand> hands;

  @Id
  @Column(length = 4)
  private String id;

  private int maxPlayers;

  private String ownerSessionId;

  @ElementCollection
  private List<Card> playedCards;

}

