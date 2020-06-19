package com.cheemcheem.projects.cardgames.service;

import com.cheemcheem.projects.cardgames.dto.GameDTO;
import com.cheemcheem.projects.cardgames.repository.GameRepository;
import com.cheemcheem.projects.cardgames.utility.GameBuilder;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class GameService {

  private final HandService handService;
  private final GameRepository gameRepository;
  private final GameBuilder gameBuilder;

  public Optional<String> newGame(String sessionId) {
    log.info("GameService.newGame");

    // (26 letters + 10 digits)^(4 length) == max size
    if (this.gameRepository.count() == 1679616) {
      log.info("Reached max game capacity.");
      return Optional.empty();
    }

    var savedGame = this.gameBuilder.createGame(sessionId);
    var savedGameId = savedGame.getId();

    this.handService.addHand(savedGameId, sessionId);

    return Optional.of(savedGameId);
  }

  @Transactional
  public HttpStatus deleteGame(String gameId, String sessionId) {
    log.info("GameService.deleteGame");
    log.debug("Deleting game with id '{}'.", gameId);

    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isPresent()) {
      log.debug("Found game with id '{}'.", gameId);

      if (!optionalGame.get().getOwnerSessionId().equals(sessionId)) {
        log.debug("Session with id '{}' does not own game with id '{}'. Not allowed to delete.", sessionId, gameId);
        return HttpStatus.UNAUTHORIZED;
      }

      this.gameRepository.deleteById(gameId);
      log.debug("Deleted game with id '{}'", gameId);

      return HttpStatus.NO_CONTENT;
    }

    log.debug("Could not find game with id '{}'.", gameId);
    return HttpStatus.NOT_FOUND;
  }

  @Transactional
  public void exitGame(String gameId, String sessionId) {
    log.info("GameService.exitGame");
    log.debug("Removing session with id '{}' from game with id '{}'. ", sessionId, gameId);


    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isEmpty()) {
      log.debug("Game with id '{}' does not exist. No need to remove.", gameId);
      return;
    }

    var game = optionalGame.get();
    if (!game.getHands().containsKey(sessionId)) {
      log.debug("Session with id '{}' was not in game with id '{}'. No need to remove.", sessionId, gameId);
      return;
    }

    game.getHands().remove(sessionId);
  }

  @Transactional
  public Optional<GameDTO> getGameDTOById(String gameId, String sessionId) {
    log.info("GameService.getGameDTOById");
    log.debug("Getting game with id '{}'.", gameId);

    var optionalGame = this.gameRepository.findById(gameId);
    log.debug("Find game by id complete.");

    if (optionalGame.isPresent()) {
      var game = optionalGame.get();
      var gameDTO = GameDTO.builder()
          .id(game.getId())
          .isOwner(game.getOwnerSessionId().equals(sessionId))
          .build();

      log.debug("Found game '{}' with id '{}'", game, gameId);
      return Optional.of(gameDTO);
    }
    log.debug("Did not find game with id '{}'.", gameId);
    return Optional.empty();
  }

  @Transactional
  public Boolean userIsInGame(String gameId, String sessionId) {
    log.info("GameService.userIsInGame");

    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isPresent()) {
      log.debug("Found game with id '{}'.", gameId);

      if (!optionalGame.get().getHands().containsKey(sessionId)) {
        log.debug("Session with id '{}' is not playing in game with id '{}'.", sessionId, gameId);
        return false;
      }
      log.debug("Session with id '{}' is playing in game with id '{}'.", sessionId, gameId);
      return true;
    }

    log.debug("Game with id does not exist'{}'.", gameId);
    return false;
  }

}
