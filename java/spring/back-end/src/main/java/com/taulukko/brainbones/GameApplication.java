package com.taulukko.brainbones;

import java.util.Optional;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;

import com.taulukko.brainbones.domain.entity.Account;
import com.taulukko.brainbones.domain.repositories.AccountDAO;

@SpringBootApplication
public class GameApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(GameApplication.class, args);
		// context.close();
		AccountDAO accountDAO = context.getBean(AccountDAO.class);
		Optional<Account> account = accountDAO.findOneByUsername("root");
		if (account.isPresent()) {
			System.out.println(account.get().toString());
		} else {
			System.out.println("Nao encontrado");
		}

	}
}
