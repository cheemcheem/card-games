package com.cheemcheem.projects.cardgames.service;

import com.cheemcheem.projects.cardgames.utility.Constants;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SessionService {
private final GameService gameService;

  public String resetSessionGames(HttpSession httpSession) {
    var sessionId = httpSession.getId();

    log.debug("Session found '{}'.", sessionId);

    var oldGameId = httpSession.getAttribute(Constants.GAME_SESSION_KEY);
    if (oldGameId != null) {
      log.debug(
          "Session '{}' contains previous game with id '{}'. Proceeding to delete previous game.",
          sessionId, oldGameId);

      var deleted = this.gameService.deleteGame(oldGameId.toString(), sessionId) ;
      if (deleted== HttpStatus.NO_CONTENT) {
        log.debug("Deleted previous game with id '{}' for session '{}'.", oldGameId, sessionId);
      } else {
        log.warn("Previous game id '{}' could not be deleted. Status '{}'.", oldGameId, deleted.toString());
      }
    }

    return sessionId;
  }
}
