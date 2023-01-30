package com.taulukko.brainbones.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import com.taulukko.brainbones.filters.JWTFilter;
import com.taulukko.brainbones.services.JWTService;
import com.taulukko.brainbones.services.UserDetailsServiceImplementation;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Override
	public void configure(WebSecurity web) throws Exception {
		//swagger config (ignore security these pages
		web.ignoring().antMatchers("v2/api-docs","cofniguration/ui","swagger-ressources/**"
				,"configuration/security","swagger-ui.html","webjars/**");
	}

	@Autowired
	private UserDetailsServiceImplementation userDetailsService;
	@Autowired
	private JWTService jwtService;
	
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new PasswordEncoder() {
			
			@Override
			public boolean matches(CharSequence rawPassword, String encodedPassword) {
				return (rawPassword+"123").equals(encodedPassword);
			}
			
			@Override
			public String encode(CharSequence rawPassword) {
				 
				return rawPassword + "123";
			}
		};
	}
	
	@Bean
	public OncePerRequestFilter jwtFilter() {
		return new JWTFilter(null, userDetailsService);
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
		.userDetailsService(userDetailsService)
		//.inMemoryAuthentication()
		.passwordEncoder(passwordEncoder());
		//.withUser("root").password(passwordEncoder().encode("PWS")).roles("USER","ADMIN");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().disable().csrf().disable()
		.authorizeRequests().antMatchers("/client").hasAnyRole("USER","ADMIN")
		.and().authorizeRequests().antMatchers("/client/**").authenticated() 
		.and().authorizeRequests().antMatchers("/test/**").permitAll()
		//.and().formLogin(); //for in /api/login
		//.and().httpBasic(); //for httpbasic
		.and().sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and().addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
	}
 
}
