package com.cheemcheem.projects.cardgames.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class SessionRestController {

  @RequestMapping("/api/authentication")
  public ResponseEntity<?> authenticate() {
    return ResponseEntity.noContent().build();
  }

}
