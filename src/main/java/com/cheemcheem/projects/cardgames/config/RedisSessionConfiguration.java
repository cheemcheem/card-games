package com.cheemcheem.projects.cardgames.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;

@Profile("prod")
@Configuration
@EnableRedisHttpSession
public class RedisSessionConfiguration extends AbstractHttpSessionApplicationInitializer {

}