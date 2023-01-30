package com.taulukko.brainbones.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.taulukko.brainbones.services.JWTService;
import com.taulukko.brainbones.services.UserDetailsServiceImplementation;

public class JWTFilter extends OncePerRequestFilter {

	@Autowired
	private JWTService jwtService;
	@Autowired
	private UserDetailsServiceImplementation userDetailsService;

	public JWTFilter(JWTService jwtService, UserDetailsServiceImplementation userDetailsService) {
		this.jwtService = jwtService;
		this.userDetailsService = userDetailsService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
			FilterChain filterChain) throws ServletException, IOException {
		String auth = request.getHeader("Authorization");
		
		if(auth==null || !auth.startsWith("Bearer"))
		{
			filterChain.doFilter(request, response);
			return;
		}
		
		String token = auth.split(" ")[1];
		if(!jwtService.isValid(token))
		{
			filterChain.doFilter(request, response);
			return;
		}
		
		String username = jwtService.getValue(JWTService.KEY_USERNAME, token);
		UserDetails userDetatils  = userDetailsService.loadUserByUsername(username);
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken  = 
				new UsernamePasswordAuthenticationToken(userDetatils, null,userDetatils.getAuthorities());
		usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
		
		filterChain.doFilter(request, response);
	}

}
