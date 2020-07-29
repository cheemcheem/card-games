package com.cheemcheem.projects.cardgames.dto.server;

import lombok.Data;

@Data
public class CardDTO {
  private final String suit;
  private final Byte value;
}
