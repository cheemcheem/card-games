package com.cheemcheem.projects.cardgames.service;

import com.cheemcheem.projects.cardgames.dto.GameDTO;
import com.cheemcheem.projects.cardgames.dto.NewGameDTO;
import com.cheemcheem.projects.cardgames.model.Player;
import com.cheemcheem.projects.cardgames.repository.GameRepository;
import com.cheemcheem.projects.cardgames.repository.PlayerRepository;
import com.cheemcheem.projects.cardgames.utility.GameBuilder;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class GameService {

  private final GameRepository gameRepository;
  private final PlayerRepository playerRepository;
  private final GameBuilder gameBuilder;

  @Transactional
  public Optional<String> newGame(String sessionId, NewGameDTO newGameDTO) {
    log.info("GameService.newGame");

    // (26 letters + 10 digits)^(4 length) == max size
    if (this.gameRepository.count() == 1679616) {
      log.info("Reached max game capacity.");
      return Optional.empty();
    }

    var savedGame = this.gameBuilder.createGame(sessionId, newGameDTO.getGameType());
    var savedGameId = savedGame.getId();

    this.addPlayer(savedGameId, newGameDTO.getUserName(), sessionId);

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
        log.debug("Session with id '{}' does not own game with id '{}'. Not allowed to delete.",
            sessionId, gameId);
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
      log.debug("Session with id '{}' was not in game with id '{}'. No need to remove.", sessionId,
          gameId);
      return;
    }

    game.getHands().remove(sessionId);
  }

  @Transactional
  public Optional<GameDTO> getGameDTOById(String gameId, String sessionId) {

    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isPresent()) {
      var game = optionalGame.get();
      var gameDTO = GameDTO.builder()
          .id(game.getId())
          .gameType(game.getGameType())
          .players(game.getPlayers().values().stream().map(Player::getUserName).collect(Collectors.toList()))
          .owner(game.getPlayers().get(game.getOwnerSessionId()).getUserName())
          .userName(game.getPlayers().getOrDefault(sessionId, new Player()).getUserName())
          .started(game.isStarted())
          .build();

      return Optional.of(gameDTO);
    }
    return Optional.empty();
  }

  @Transactional
  public Boolean userIsInGame(String gameId, String sessionId) {
    log.info("GameService.userIsInGame");

    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isPresent()) {
      log.debug("Found game with id '{}'.", gameId);

      if (!optionalGame.get().getPlayers().containsKey(sessionId)) {
        log.debug("Session with id '{}' is not playing in game with id '{}'.", sessionId, gameId);
        return false;
      }
      log.debug("Session with id '{}' is playing in game with id '{}'.", sessionId, gameId);
      return true;
    }

    log.debug("Game with id does not exist'{}'.", gameId);
    return false;
  }

  @Transactional
  public boolean addPlayer(String gameId, String userName, String sessionId) {
    log.info("GameService.addPlayer");
    log.debug("Adding player for session with id '{}' to game with id '{}'", sessionId, gameId);

    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isEmpty()) {
      log.debug("Could not find game with id '{}'.", gameId);
      return false;
    }
    var game = optionalGame.get();
    log.debug("Found game with id '{}'.", gameId);

    if (game.getPlayers().containsKey(sessionId)) {
      log.debug("Session with id '{}' is already in game with id '{}'", sessionId, gameId);
      return true;
    }

    log.debug("Session with id '{}' is not already in game with id '{}'", sessionId, gameId);

    var player = new Player();
    player.setUserName(userName);
    log.debug("Created new player '{}'.", player);

    var savedPlayer = this.playerRepository.save(player);
    log.debug("Saved player with id '{}'.", player.getId());
    log.debug("Saved player with savedId '{}'.", savedPlayer.getId());
    log.debug("Saved player '{}'.", savedPlayer);

    game.getPlayers().put(sessionId, savedPlayer);
    log.debug("Added player to game '{}'.", game);

    var savedGame = this.gameRepository.save(game);
    log.debug("Saved game with id '{}'.", game.getId());
    log.debug("Saved game with savedId '{}'.", savedGame.getId());
    log.debug("Saved game '{}'.", savedGame);

    return true;
  }


  public HttpStatus startGame(String gameId, String sessionId) {
    log.info("GameService.startGame");
    log.debug("Starting game with id '{}'.", gameId);

    var optionalGame = this.gameRepository.findById(gameId);

    if (optionalGame.isPresent()) {
      log.debug("Found game with id '{}'.", gameId);

      if (!optionalGame.get().getOwnerSessionId().equals(sessionId)) {
        log.debug("Session with id '{}' does not own game with id '{}'. Not allowed to start.",
            sessionId, gameId);
        return HttpStatus.UNAUTHORIZED;
      }

      optionalGame.get().setStarted(true);
      this.gameRepository.save(optionalGame.get());
      log.debug("Started game with id '{}'", gameId);

      return HttpStatus.NO_CONTENT;
    }

    log.debug("Could not find game with id '{}'.", gameId);
    return HttpStatus.NOT_FOUND;
  }

}
