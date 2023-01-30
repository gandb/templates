package com.taulukko.brainbones.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.taulukko.brainbones.annotations.ConfigProduction;


@ConfigProduction
public class ApplicationConfigurationProduction {
	
	@Bean
	public String applicationName() {
		return "Brain And Bones";
	}
	 
	@Bean("startAplicationConfiguration")
	public CommandLineRunner start()
	{
		return  (String... args) -> {
				
				System.out.println("==Production configuration==");
				
			};
	}

}
