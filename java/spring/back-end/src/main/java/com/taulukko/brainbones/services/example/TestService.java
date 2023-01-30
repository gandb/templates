package com.taulukko.brainbones.services.example;

import org.springframework.stereotype.Controller;

import com.taulukko.brainbones.errors.BusinessException;

@Controller
public class TestService {
	
	private static int count = 0 ;
	
	public String helloWorld( ) {
		return "Hello World";
	}

	public String echo(String message) {
		if(message.length()<=2)
		{
			throw new BusinessException("Erro de regra do echo, tem que ter mais de 2 caracteres");
		}
		return message;
	}

	public int count() { 
		return count++;
	}
}
