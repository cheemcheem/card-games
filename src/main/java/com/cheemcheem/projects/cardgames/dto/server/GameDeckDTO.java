package com.cheemcheem.projects.cardgames.dto.server;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameDeckDTO {
  private final CardDTO topCard;
}
