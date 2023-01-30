package com.taulukko.brainbones.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.taulukko.brainbones.domain.entity.Account;

import io.jsonwebtoken.Claims;


@RunWith(SpringJUnit4ClassRunner.class)   
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc 
public class JWTServiceTest { 
	 
	@Autowired 
	private JWTService jwtService ;

	 
	@Test
	public void createAndRecover() throws Exception {
		Account account = Account.builder()
				.username("Fulano")
				.email("fulano@fulano.com")
				.id("umidqualquer")
				.accesslevel("ADMIN").build();
		String token = jwtService.buildToken(account);
		Claims claims = jwtService.tokenToClaims(token);
		assertEquals("Fulano", claims.get(JWTService.KEY_USERNAME));
		assertEquals("fulano@fulano.com", claims.get(JWTService.KEY_EMAIL));
		assertEquals("ADMIN", claims.get(JWTService.KEY_ACCESSLEVEL));
		assertEquals("umidqualquer", claims.getSubject());
		 
	}
	
	@Test
	public void verifyExpiration() throws Exception {
		Account account = Account.builder()
				.username("Fulano")
				.email("fulano@fulano.com")
				.id("umidqualquer")
				.accesslevel("ADMIN").build();
		String token = jwtService.buildToken(account);
		boolean valid = jwtService.isValid(token);
		assertEquals(true, valid); 
		 
	}
	
	@Test
	public void getValue() throws Exception {
		Account account = Account.builder()
				.username("Fulano")
				.email("fulano@fulano.com")
				.id("umidqualquer")
				.accesslevel("ADMIN").build();
		String token = jwtService.buildToken(account);
		String email = jwtService.getValue(JWTService.KEY_EMAIL,token);
		assertEquals("fulano@fulano.com", email);  
	}
}
