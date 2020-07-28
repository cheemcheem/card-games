package com.cheemcheem.projects.cardgames.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameDTO {

  private String id;

  private String owner;

  private String gameType;

  private String userName;

  private boolean started;

  private List<String> players;
}
