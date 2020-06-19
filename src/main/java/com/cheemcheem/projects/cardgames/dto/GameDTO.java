package com.cheemcheem.projects.cardgames.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameDTO {

  private String id;

  private Boolean isOwner;

}
