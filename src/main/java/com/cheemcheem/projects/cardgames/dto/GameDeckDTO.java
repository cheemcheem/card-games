package com.cheemcheem.projects.cardgames.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameDeckDTO {
  private final CardDTO topCard;
}
