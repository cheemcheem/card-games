package com.cheemcheem.projects.cardgames.utility;

import com.cheemcheem.projects.cardgames.model.Game;
import com.cheemcheem.projects.cardgames.model.Player;
import com.cheemcheem.projects.cardgames.repository.GameRepository;
import java.util.HashMap;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GameBuilder {

  private static final Random RANDOM = new Random();
  private final GameRepository gameRepository;

  public Game createGame(String ownerSessionId, String gameType) {
    var game = new Game();
    var id = generateId();

    game.setOwnerSessionId(ownerSessionId);
    game.setId(id);
    game.setGameType(gameType);
    game.setHands(new HashMap<>());
    game.setPlayers(new HashMap<>());
    game.setStarted(false);
    log.debug("Created new game '{}'.", game);

    var savedGame = this.gameRepository.save(game);
    log.debug("Saved game with id '{}'.", savedGame.getId());
    return savedGame;
  }

  private String generateId() {
    var idBuilder = new StringBuilder();
    while (idBuilder.length() == 0 || gameRepository.existsById(idBuilder.toString())) {
      idBuilder.delete(0, 4);
      for (int i = 0; i < 4; i++) {
        if (RANDOM.nextBoolean()) {
          idBuilder.append(RANDOM.nextInt(10));
        } else {
          idBuilder.append((char) ('A' + RANDOM.nextInt(26)));
        }
      }
    }
    return idBuilder.toString();
  }


}