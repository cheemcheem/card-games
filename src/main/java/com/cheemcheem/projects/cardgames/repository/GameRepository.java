package com.cheemcheem.projects.cardgames.repository;

import com.cheemcheem.projects.cardgames.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, String> {

}
