package com.taulukko.brainbones.domain.repositories.example;

import org.springframework.stereotype.Repository;

import com.taulukko.brainbones.model.Game;

@Repository
public class GameDAOOld {
	public boolean insert(Game game)
	{
		System.out.println("Camada de persistencia");
		return true;
	}

}
