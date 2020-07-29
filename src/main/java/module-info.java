module card.games {
  requires com.fasterxml.classmate;
  requires com.fasterxml.jackson.core;
  requires com.fasterxml.jackson.databind;
  requires java.persistence;
  requires java.sql;
  requires java.transaction;
  requires net.bytebuddy;
  requires org.apache.commons.lang3;
  requires org.apache.tomcat.embed.core;
  requires org.slf4j;
  requires spring.beans;
  requires spring.boot;
  requires spring.boot.autoconfigure;
  requires spring.context;
  requires spring.data.jpa;
  requires spring.webmvc;
  requires spring.security.config;
  requires spring.security.core;
  requires spring.security.web;
  requires spring.session.core;
  requires spring.session.data.redis;
  requires spring.web;

  requires static lombok;

  opens com.cheemcheem.projects.cardgames;
  opens com.cheemcheem.projects.cardgames.config to spring.core, spring.beans, spring.context;
  opens com.cheemcheem.projects.cardgames.controller to spring.beans, spring.web;
  opens com.cheemcheem.projects.cardgames.dto.client to com.fasterxml.jackson.databind;
  opens com.cheemcheem.projects.cardgames.dto.server to com.fasterxml.jackson.databind;
  opens com.cheemcheem.projects.cardgames.interceptor to spring.beans;
  opens com.cheemcheem.projects.cardgames.model to spring.core, spring.beans, spring.data.jpa, org.hibernate.orm.core, spring.context;
  opens com.cheemcheem.projects.cardgames.repository to spring.beans, spring.core, spring.context;
  opens com.cheemcheem.projects.cardgames.service;
  opens com.cheemcheem.projects.cardgames.utility to spring.beans;

  exports com.cheemcheem.projects.cardgames;

}