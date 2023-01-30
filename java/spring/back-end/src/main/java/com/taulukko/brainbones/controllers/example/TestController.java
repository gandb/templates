package com.taulukko.brainbones.controllers.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taulukko.brainbones.services.example.TestService;

@RestController
@RequestMapping("/test")
public class TestController {

	@Autowired
	private TestService service;
	
	@GetMapping("/helloworld")
	public String helloWorld() { 
		return service.helloWorld();
	} 
	
	@GetMapping("/echo/{message}")
	public String echo(@PathVariable("message") String message) { 
		return service.echo(message);
	}
	
	@GetMapping("/count")
	public int count() { 
		return service.count();
	}
}
