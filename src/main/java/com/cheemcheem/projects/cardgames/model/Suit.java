package com.cheemcheem.projects.cardgames.model;

import lombok.Getter;

public enum Suit {
  HEARTS(Colour.RED),
  DIAMONDS(Colour.RED),
  CLUBS(Colour.BLACK),
  SPADES(Colour.BLACK),
  ;

  @Getter
  private final Colour colour;

  Suit(Colour colour) {
    this.colour = colour;
  }

}
