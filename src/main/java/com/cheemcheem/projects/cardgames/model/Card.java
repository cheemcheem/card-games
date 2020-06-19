package com.cheemcheem.projects.cardgames.model;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;

public enum Card {

  ACE_OF_HEARTS((byte) 1, Suit.HEARTS),
  TWO_OF_HEARTS((byte) 2, Suit.HEARTS),
  THREE_OF_HEARTS((byte) 3, Suit.HEARTS),
  FOUR_OF_HEARTS((byte) 4, Suit.HEARTS),
  FIVE_OF_HEARTS((byte) 5, Suit.HEARTS),
  SIX_OF_HEARTS((byte) 6, Suit.HEARTS),
  SEVEN_OF_HEARTS((byte) 7, Suit.HEARTS),
  EIGHT_OF_HEARTS((byte) 8, Suit.HEARTS),
  NINE_OF_HEARTS((byte) 9, Suit.HEARTS),
  TEN_OF_HEARTS((byte) 10, Suit.HEARTS),
  JACK_OF_HEARTS((byte) 11, Suit.HEARTS),
  QUEEN_OF_HEARTS((byte) 12, Suit.HEARTS),
  KING_OF_HEARTS((byte) 13, Suit.HEARTS),
  ACE_OF_DIAMONDS((byte) 1, Suit.DIAMONDS),
  TWO_OF_DIAMONDS((byte) 2, Suit.DIAMONDS),
  THREE_OF_DIAMONDS((byte) 3, Suit.DIAMONDS),
  FOUR_OF_DIAMONDS((byte) 4, Suit.DIAMONDS),
  FIVE_OF_DIAMONDS((byte) 5, Suit.DIAMONDS),
  SIX_OF_DIAMONDS((byte) 6, Suit.DIAMONDS),
  SEVEN_OF_DIAMONDS((byte) 7, Suit.DIAMONDS),
  EIGHT_OF_DIAMONDS((byte) 8, Suit.DIAMONDS),
  NINE_OF_DIAMONDS((byte) 9, Suit.DIAMONDS),
  TEN_OF_DIAMONDS((byte) 10, Suit.DIAMONDS),
  JACK_OF_DIAMONDS((byte) 11, Suit.DIAMONDS),
  QUEEN_OF_DIAMONDS((byte) 12, Suit.DIAMONDS),
  KING_OF_DIAMONDS((byte) 13, Suit.DIAMONDS),
  ACE_OF_CLUBS((byte) 1, Suit.CLUBS),
  TWO_OF_CLUBS((byte) 2, Suit.CLUBS),
  THREE_OF_CLUBS((byte) 3, Suit.CLUBS),
  FOUR_OF_CLUBS((byte) 4, Suit.CLUBS),
  FIVE_OF_CLUBS((byte) 5, Suit.CLUBS),
  SIX_OF_CLUBS((byte) 6, Suit.CLUBS),
  SEVEN_OF_CLUBS((byte) 7, Suit.CLUBS),
  EIGHT_OF_CLUBS((byte) 8, Suit.CLUBS),
  NINE_OF_CLUBS((byte) 9, Suit.CLUBS),
  TEN_OF_CLUBS((byte) 10, Suit.CLUBS),
  JACK_OF_CLUBS((byte) 11, Suit.CLUBS),
  QUEEN_OF_CLUBS((byte) 12, Suit.CLUBS),
  KING_OF_CLUBS((byte) 13, Suit.CLUBS),
  ACE_OF_SPADES((byte) 1, Suit.SPADES),
  TWO_OF_SPADES((byte) 2, Suit.SPADES),
  THREE_OF_SPADES((byte) 3, Suit.SPADES),
  FOUR_OF_SPADES((byte) 4, Suit.SPADES),
  FIVE_OF_SPADES((byte) 5, Suit.SPADES),
  SIX_OF_SPADES((byte) 6, Suit.SPADES),
  SEVEN_OF_SPADES((byte) 7, Suit.SPADES),
  EIGHT_OF_SPADES((byte) 8, Suit.SPADES),
  NINE_OF_SPADES((byte) 9, Suit.SPADES),
  TEN_OF_SPADES((byte) 10, Suit.SPADES),
  JACK_OF_SPADES((byte) 11, Suit.SPADES),
  QUEEN_OF_SPADES((byte) 12, Suit.SPADES),
  KING_OF_SPADES((byte) 13, Suit.SPADES),
  ;

  @Getter
  private final byte value;

  @Getter
  private final Suit suit;

  private static final Random random = new Random();

  Card(byte val, Suit suit) {
    this.value = val;
    this.suit = suit;
  }

  public static Card from(byte value, Suit suit) {
    return Arrays.stream(Card.values())
        .filter(card -> card.getValue() == value && card.getSuit() == suit)
        .findAny()
        .orElseThrow();
  }

  public static Set<Card> from(Suit suit) {
    return Arrays.stream(Card.values())
        .filter(card -> card.getSuit() == suit)
        .collect(Collectors.toSet());
  }

  public static Set<Card> random(byte count) {
    if (count > Card.values().length) {
      throw new RuntimeException("Can't create unique deck of size " + count);
    }
    var cards = new HashSet<Card>();
    while (cards.size() < count) {
      cards.add(Card.values()[random.nextInt(Card.values().length)]);
    }
    return cards;
  }
}
