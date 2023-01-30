package com.taulukko.brainbones.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("development") //optional, if miss work to any profile
public class ApplicationConfigurationDevelop {
	
	@Bean
	public String applicationName() {
		return "Brain And Bones Desenvolvimento";
	}
	 

}
