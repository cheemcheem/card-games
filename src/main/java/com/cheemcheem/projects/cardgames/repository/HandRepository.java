package com.cheemcheem.projects.cardgames.repository;

import com.cheemcheem.projects.cardgames.model.Hand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HandRepository extends JpaRepository<Hand, String> {

}
