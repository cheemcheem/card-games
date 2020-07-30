package com.cheemcheem.projects.cardgames.dto.server;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameDetailsDTO {

  private List<String> players;

  private boolean started;

}
