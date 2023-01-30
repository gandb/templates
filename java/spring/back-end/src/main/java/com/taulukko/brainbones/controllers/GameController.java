package com.taulukko.brainbones.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.taulukko.brainbones.dto.OrderDTO;
import com.taulukko.brainbones.model.Game;
import com.taulukko.brainbones.services.GameService;

@RestController()
@RequestMapping("/game")
public class GameController {
	
 
	@Autowired
	private GameService gameService;
	
	@PostMapping("/") 
	public boolean insert(Game game) {
		System.out.println("Camada de controller");
		return gameService.insert(game);
	} 
	
}
