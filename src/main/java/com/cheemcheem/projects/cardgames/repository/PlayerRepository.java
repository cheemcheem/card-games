package com.cheemcheem.projects.cardgames.repository;

import com.cheemcheem.projects.cardgames.model.Hand;
import com.cheemcheem.projects.cardgames.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {

}
