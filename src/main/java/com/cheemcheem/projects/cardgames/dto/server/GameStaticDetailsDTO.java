package com.cheemcheem.projects.cardgames.dto.server;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameStaticDetailsDTO {

  private int minPlayers;

  private int maxPlayers;

  private String id;

  private String owner;

  private String gameType;

  private String userName;


}
