package com.cheemcheem.projects.cardgames.controller;

import com.cheemcheem.projects.cardgames.dto.GameDTO;
import com.cheemcheem.projects.cardgames.dto.JoinGameDTO;
import com.cheemcheem.projects.cardgames.dto.NewGameDTO;
import com.cheemcheem.projects.cardgames.service.GameService;
import com.cheemcheem.projects.cardgames.service.HandService;
import com.cheemcheem.projects.cardgames.service.SessionService;
import com.cheemcheem.projects.cardgames.utility.Constants;
import java.net.URI;
import java.util.List;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/game")
@RequiredArgsConstructor
@RestController
public class GameController {

  private final GameService gameService;
  private final SessionService sessionService;

  @PostMapping("/new")
  public ResponseEntity<String> newGame(HttpSession httpSession,
      @RequestBody NewGameDTO newGameDTO) {
    log.info("GameController.newGame");

    newGameDTO.setUserName(newGameDTO.getUserName().toUpperCase());
    var sessionId = this.sessionService.resetSessionGames(httpSession);

    var optionalGameId = this.gameService.newGame(sessionId, newGameDTO);
    if (optionalGameId.isEmpty()) {
      // reached max games
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
          .header(HttpHeaders.RETRY_AFTER, "3600").build();
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
    var optionalState = this.gameService.getGameDTOById(gameId, httpSession.getId());
    return ResponseEntity.of(optionalState);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteGame(HttpSession httpSession,
      @RequestAttribute(Constants.GAME_ATTRIBUTE_KEY) String gameId) {
    log.info("GameController.deleteGame");

    var deleted = gameService.deleteGame(gameId, httpSession.getId());
    log.debug("Game{}deleted.", deleted == HttpStatus.NO_CONTENT ? " " : " not ");

    return ResponseEntity.status(deleted).build();
  }

  @DeleteMapping("/exit")
  public void exitGAme(HttpSession httpSession,
      @RequestAttribute(Constants.GAME_ATTRIBUTE_KEY) String gameId) {
    log.info("GameController.exitGame");

    var sessionId = httpSession.getId();
    gameService.exitGame(gameId, sessionId);
    log.debug("Game with id '{}' exited by session with id '{}'.", gameId, sessionId);

    this.sessionService.resetSessionGames(httpSession);
  }

  @PutMapping("/join")
  public ResponseEntity<String> joinGame(@RequestBody JoinGameDTO joinGameDTO,
      HttpSession httpSession) {
    log.info("GameController.joinGame");

    joinGameDTO.setGameId(joinGameDTO.getGameId().toUpperCase());
    joinGameDTO.setUserName(joinGameDTO.getUserName().toUpperCase());

    log.debug("Checking that session with id '{}' is not already part of game with id '{}'.",
        httpSession.getId(), joinGameDTO.getGameId());
    var userIsInGame = this.gameService.userIsInGame(joinGameDTO.getGameId(), httpSession.getId());

    if (userIsInGame) {
      log.debug("Session with id '{}' is already part of game with id '{}'.", httpSession.getId(),
          joinGameDTO.getGameId());
      return ResponseEntity.noContent().build();
    }

    log.debug("Session with id '{}' is not already a part of game with id '{}'.",
        httpSession.getId(), joinGameDTO.getGameId());
    var sessionId = this.sessionService.resetSessionGames(httpSession);

    httpSession.setAttribute(Constants.GAME_SESSION_KEY, joinGameDTO.getGameId());
    log.debug("Session '{}' now stores game id '{}'.", sessionId, joinGameDTO.getGameId());

    var successfullyAddedPlayer = this.gameService
        .addPlayer(joinGameDTO.getGameId(), joinGameDTO.getUserName(), sessionId);
    log.debug("Player{}to session with id '{}'.",
        successfullyAddedPlayer ? " successfully added " : " was not added ",
        sessionId);

    if (!successfullyAddedPlayer) {
      // case when hand failed to be added to game due to game not found
      log.debug("Failed to find game '{}', removing from session '{}'.", joinGameDTO.getGameId(),
          sessionId);
      this.sessionService.resetSessionGames(httpSession);
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.noContent().build();
  }

  @GetMapping("/types")
  public ResponseEntity<List<String>> getTypes() {
    return ResponseEntity.ok(List.of("Solo Whist"));
  }


  @PostMapping("/start")
  public ResponseEntity<String> startGame(HttpSession httpSession,
      @RequestAttribute(Constants.GAME_ATTRIBUTE_KEY) String gameId) {
    log.info("GameController.startGame");

    var started = gameService.startGame(gameId, httpSession.getId());
    log.debug("Game{}started.", started == HttpStatus.NO_CONTENT ? " " : " not ");

    return ResponseEntity.status(started).build();
  }
}
