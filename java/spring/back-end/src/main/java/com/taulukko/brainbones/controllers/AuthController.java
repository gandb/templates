package com.taulukko.brainbones.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taulukko.brainbones.dto.CredentialDTO;
import com.taulukko.brainbones.dto.TokenDTO;
import com.taulukko.brainbones.services.UserDetailsServiceImplementation;

@RestController()
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserDetailsServiceImplementation userDetailsService;


	@PostMapping
	public TokenDTO auth(@RequestBody CredentialDTO credentials) {

		return  userDetailsService.auth(credentials);
		 
	}

}
