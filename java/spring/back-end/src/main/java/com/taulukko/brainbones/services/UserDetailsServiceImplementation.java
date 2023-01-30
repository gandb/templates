package com.taulukko.brainbones.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taulukko.brainbones.domain.entity.Account;
import com.taulukko.brainbones.domain.repositories.AccountDAO;
import com.taulukko.brainbones.dto.CredentialDTO;
import com.taulukko.brainbones.dto.TokenDTO;
import com.taulukko.brainbones.errors.BusinessException;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {

	@Autowired
	private AccountDAO accountDAO;
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private JWTService jwtService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Account account = loadAccountByUsername(username) ;

		return User.builder().password(account.getPassword()).username(account.getUsername()).roles("USER", "ADMIN")
				.build();
	} 
 
	private Account loadAccountByUsername(String username) throws UsernameNotFoundException {

		Account account = accountDAO.findOneByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		return account;
	} 

 

	public TokenDTO auth(CredentialDTO credentials) {
		Account account =  loadAccountByUsername(credentials.getUsername());
		boolean matchPassword = encoder.matches(credentials.getPassword(), account.getPassword());
		if(!matchPassword)
		{
			 new BusinessException("Password Invalid");
		}

		String token = jwtService.buildToken(account);
		
		TokenDTO tokenDTO = TokenDTO.builder().token(token).username(credentials.getUsername()).build();
		
		return  tokenDTO;
		
	}

}
