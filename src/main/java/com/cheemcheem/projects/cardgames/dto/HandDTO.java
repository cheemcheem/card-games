package com.cheemcheem.projects.cardgames.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HandDTO {
  private List<CardDTO> hand;
}
