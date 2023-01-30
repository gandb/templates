package com.taulukko.brainbones.domain.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DAOBase {
	
	@Autowired
	private JdbcTemplate jdbcTemplate ;
	
	public void get() {
		
		
	}

}
