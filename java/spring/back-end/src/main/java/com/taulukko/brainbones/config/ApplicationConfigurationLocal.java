package com.taulukko.brainbones.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("local") //optional, if miss work to any profile
public class ApplicationConfigurationLocal {
	
	@Bean
	public String applicationName() {
		return "Brain And Bones Local";
	}
	
	@Bean("startAplicationConfiguration")
	public CommandLineRunner start()
	{
		return  (String... args) -> {
				System.out.println("==Local configuration==");
				
			};
	}
	 

}
