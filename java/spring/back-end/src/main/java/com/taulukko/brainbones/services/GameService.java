package com.taulukko.brainbones.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taulukko.brainbones.domain.repositories.example.GameDAOOld;
import com.taulukko.brainbones.model.Game;

@Service
public class GameService {
	
	@Autowired
	private GameDAOOld gameRepository;
	
	
	public boolean insert(Game game)
	{
		System.out.println("Camada de serviço");
		if(validateGame(game))
		{
			return gameRepository.insert(game);
		}
		return false;
	}
	
	private boolean validateGame(Game game)
	{
		System.out.println("Camada de serviço.validação");
		//validações
		return true;
	}
}
