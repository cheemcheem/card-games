package com.cheemcheem.projects.cardgames.service;

import com.cheemcheem.projects.cardgames.dto.CardDTO;
import com.cheemcheem.projects.cardgames.dto.HandDTO;
import com.cheemcheem.projects.cardgames.model.Card;
import com.cheemcheem.projects.cardgames.model.Hand;
import com.cheemcheem.projects.cardgames.model.Suit;
import com.cheemcheem.projects.cardgames.repository.GameRepository;
import com.cheemcheem.projects.cardgames.repository.HandRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class HandService {

  private final GameRepository gameRepository;
  private final HandRepository handRepository;

  @Transactional
  public boolean addHand(String gameId, String sessionId) {
    log.info("HandService.addHand");
    log.debug("Adding a hand for session with id '{}' to game with id '{}'", sessionId, gameId);

    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isEmpty()) {
      log.debug("Could not find game with id '{}'.", gameId);
      return false;
    }
    var game = optionalGame.get();
    log.debug("Found game with id '{}'.", gameId);

    if (game.getHands().containsKey(sessionId)) {
      log.debug("Session with id '{}' is already in game with id '{}'", sessionId, gameId);
      return true;
    }

    log.debug("Session with id '{}' is not already in game with id '{}'", sessionId, gameId);

    var hand = new Hand();
    // new ArrayList is required to ensure it is mutable otherwise gameRepository save will fail
    hand.setHand(new ArrayList<>(Card.random((byte) 13)));
    log.debug("Created new hand '{}'.", hand);

    var savedHand = this.handRepository.save(hand);
    log.debug("Saved hand with id '{}'.", hand.getId());
    log.debug("Saved hand with savedId '{}'.", savedHand.getId());
    log.debug("Saved hand '{}'.", savedHand);

    game.getHands().put(sessionId, savedHand);
    log.debug("Added hand to game '{}'.", game);

    var savedGame = this.gameRepository.save(game);
    log.debug("Saved game with id '{}'.", game.getId());
    log.debug("Saved game with savedId '{}'.", savedGame.getId());
    log.debug("Saved game '{}'.", savedGame);

    return true;
  }

  @Transactional
  public Optional<HandDTO> getHand(String gameId, String sessionId) {
    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isEmpty()) {
      return Optional.empty();
    }

    var game = optionalGame.get();

    if (!game.getHands().containsKey(sessionId)) {
      return Optional.empty();
    }

    var hand = game.getHands().get(sessionId);

    var handDTOHand = hand.getHand().stream()
        .map(card -> new CardDTO(card.getSuit().name(), card.getValue()))
        .collect(Collectors.toList());
    var handDTO = HandDTO.builder().hand(handDTOHand).build();

    return Optional.of(handDTO);
  }
}
