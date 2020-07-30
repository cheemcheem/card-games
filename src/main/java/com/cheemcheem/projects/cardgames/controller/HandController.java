package com.cheemcheem.projects.cardgames.controller;

import com.cheemcheem.projects.cardgames.dto.server.HandDTO;
import com.cheemcheem.projects.cardgames.service.HandService;
import com.cheemcheem.projects.cardgames.utility.Constants;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/hand")
@RequiredArgsConstructor
@RestController
public class HandController {

  private final HandService handService;

  @GetMapping("/get")
  public ResponseEntity<HandDTO> getHand(HttpSession httpSession,
      @RequestAttribute(Constants.GAME_ATTRIBUTE_KEY) String gameId) {
    var sessionId = httpSession.getId();
    return ResponseEntity.of(this.handService.getHand(gameId, sessionId));
  }
}
