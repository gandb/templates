package com.taulukko.brainbones.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController()
@RequestMapping("/application")
public class ApplicationController {
	
	@Autowired	@Qualifier("applicationName")
	private String applicationName;
	@Autowired	@Value("${aplication.version}")
	private String applicationVersion;
	@Autowired	@Value("${application.enviroment}")
	private String applicationEnviroment;
	
	@PostMapping("/start")
	public void start(@RequestBody String key) {
		
		System.out.println("Key:" + key);

	}

	@GetMapping("/name")
	public String name() {
		return applicationName;
	}
	
	@GetMapping("/version")
	public String version() {
		return applicationVersion;
	}
	
	@GetMapping("/enviroment")
	public String enviroment() {
		return applicationEnviroment;
	}
}
