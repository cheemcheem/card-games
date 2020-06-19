package com.cheemcheem.projects.cardgames.config;


import java.util.concurrent.ConcurrentHashMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;

@EnableSpringHttpSession
@Profile({"!prod"})
@Configuration
public class SessionConfiguration {
  @Bean
  public MapSessionRepository sessionRepository() {
    return new MapSessionRepository(new ConcurrentHashMap<>());
  }
}
