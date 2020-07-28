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
          = Pattern.compile("(/api/game/get)|(/api/game/delete)|(/api/game/exit)|(/api/hand/get)|(/api/game/start)").asMatchPredicate().negate();

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
    if (excludedPaths.test(request.getServletPath())) {
      return true;
    }

    var session = request.getSession();
    var gameId = session.getAttribute(Constants.GAME_SESSION_KEY);

    if (gameId == null) {
      log.warn("Interceptor failed. Game id attached to session is null.");
      response.setStatus(404);
      return false;
    }

    request.setAttribute(Constants.GAME_ATTRIBUTE_KEY, gameId);
    return true;

  }
}
