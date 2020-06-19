package com.cheemcheem.projects.cardgames.controller;

import com.cheemcheem.projects.cardgames.dto.GameDTO;
import com.cheemcheem.projects.cardgames.service.GameService;
import com.cheemcheem.projects.cardgames.service.HandService;
import com.cheemcheem.projects.cardgames.service.SessionService;
import com.cheemcheem.projects.cardgames.utility.Constants;
import java.net.URI;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/game")
@RequiredArgsConstructor
@RestController
public class GameController {

  private final GameService gameService;
  private final SessionService sessionService;
  private final HandService handService;

  @PostMapping("/new")
  public ResponseEntity<String> newGame(HttpSession httpSession) {
    log.info("GameController.newGame");

    var sessionId = this.sessionService.resetSessionGames(httpSession);

    var optionalGameId = this.gameService.newGame(sessionId);
    if (optionalGameId.isEmpty()) {
      // reached max games
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).header(HttpHeaders.RETRY_AFTER, "3600").build();
    }

    var gameId = optionalGameId.get();
    log.debug("Game created with id '{}'.", gameId);

    httpSession.setAttribute(Constants.GAME_SESSION_KEY, gameId);
    log.debug("Session '{}' now stores game id '{}'.", sessionId, gameId);
    return ResponseEntity.created(URI.create("/api/game/get")).body(gameId);
  }

  @GetMapping("/get")
  public ResponseEntity<GameDTO> getGame(
      HttpSession httpSession,
      @RequestAttribute(Constants.GAME_ATTRIBUTE_KEY) String gameId) {
    log.info("GameController.getGame");

    var optionalState = this.gameService.getGameDTOById(gameId, httpSession.getId());
    if (log.isDebugEnabled()) {
      if (optionalState.isPresent()) {
        log.debug("Game found '{}' for id '{}'.", optionalState, gameId);
      } else {
        log.debug("Game not found for id '{}'.", gameId);
      }
    }

    return ResponseEntity.of(optionalState);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteGame(HttpSession httpSession, @RequestAttribute(Constants.GAME_ATTRIBUTE_KEY) String gameId) {
    log.info("GameController.deleteGame");

    var deleted = gameService.deleteGame(gameId, httpSession.getId());
    log.debug("Game{}deleted.", deleted == HttpStatus.NO_CONTENT ? " " : " not ");

    return ResponseEntity.status(deleted).build();
  }

  @DeleteMapping("/exit")
  public void exitGAme(HttpSession httpSession, @RequestAttribute(Constants.GAME_ATTRIBUTE_KEY) String gameId) {
    log.info("GameController.exitGame");

    var sessionId = httpSession.getId();
    gameService.exitGame(gameId, sessionId);
    log.debug("Game with id '{}' exited by session with id '{}'.", gameId, sessionId);

    this.sessionService.resetSessionGames(httpSession);
  }

  @PutMapping("/join/{gameId}")
  public ResponseEntity<String> joinGame(@PathVariable("gameId") String gameId, HttpSession httpSession) {
    log.info("GameController.joinGame");

    log.debug("Checking that session with id '{}' is not already part of game with id '{}'.", httpSession.getId(), gameId);
    var userIsInGame = this.gameService.userIsInGame(gameId, httpSession.getId());

    if (userIsInGame) {
      log.debug("Session with id '{}' is already part of game with id '{}'.", httpSession.getId(), gameId);
      return ResponseEntity.noContent().build();
    }

    log.debug("Session with id '{}' is not already a part of game with id '{}'.", httpSession.getId(), gameId);
    var sessionId = this.sessionService.resetSessionGames(httpSession);

    httpSession.setAttribute(Constants.GAME_SESSION_KEY, gameId);
    log.debug("Session '{}' now stores game id '{}'.", sessionId, gameId);

    var successfullyAdded = this.handService.addHand(gameId, sessionId);
    log.debug("Hand{}to session with id '{}'.", successfullyAdded ? " successfully added " : " was not added ",
        sessionId);

    if (!successfullyAdded) {
      // case when hand failed to be added to game due to game not found
      log.debug("Failed to find game '{}', removing from session '{}'.", gameId, sessionId);
      this.sessionService.resetSessionGames(httpSession);
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.noContent().build();
  }

}
