package com.cheemcheem.projects.cardgames.interceptor;

import com.cheemcheem.projects.cardgames.utility.Constants;
import java.util.function.Predicate;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class AttachStateInterceptor implements HandlerInterceptor {
  private static final Predicate<String> excludedPaths
          = Pattern.compile("(/api/game/get)|(/api/game/delete)|(/api/game/exit)|(/api/hand/get)").asMatchPredicate().negate();

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
    log.info("AttachStateInterceptor.preHandle");

    if (excludedPaths.test(request.getServletPath())) {
      log.debug("Path '{}' does not require game, proceeding.", request.getServletPath());
      return true;
    }

    log.debug("Path '{}' requires game.'", request.getServletPath());

    var session = request.getSession();
    var gameId = session.getAttribute(Constants.GAME_SESSION_KEY);

    if (gameId == null) {
      log.warn("Interceptor failed. Game id attached to session is null.");
      response.setStatus(404);
      return false;
    } else {
      log.debug("Game id '{}' attached to session '{}'.", gameId, session.getId());
    }

    request.setAttribute(Constants.GAME_ATTRIBUTE_KEY, gameId);
    log.info("Attached game id to request.");
    log.debug("Attached game id '{}' to request.", gameId);
    return true;

  }
}
