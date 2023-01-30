package com.taulukko.brainbones.domain.repositories.example;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.taulukko.brainbones.domain.entity.example.Client;
import com.taulukko.brainbones.domain.repositories.DAOBase;
 
/*
 * Usando Spring e hibernate existem 3 tipos de acesso à banco de dados:
 * JDBC Template
 * JPA
 * Spring JPA Data
 * 
 * Esta classe exemplifica os dois primeiros, como o mais usado é o Spring JPA Data, 
 * o ClienteDAO tem os exemplos desta classe
 * */
@Repository
public class ClientDAOOld extends DAOBase {
	
	@Autowired
	private JdbcTemplate jdbcTemplate ;
	@Autowired
	private EntityManager entityManager ; 
	private static final String SQL_INSERT = "INSERT INTO clients (id,name) VALUES (?,?)";
	private static final String SQL_SELECT_ALL = "SELECT * FROM clients";
	
	/**
	 * Início JDBCTemplate Examples
	 * */
	public Client insertOld(Client client)
	{		
		jdbcTemplate.update( SQL_INSERT,client.getId() , client.getName());
		return client;
	}


	
	public List<Client> listAllOld() throws SQLException
	{		
		return jdbcTemplate.query(SQL_SELECT_ALL, new RowMapper<Client>() {

			@Override
			public Client mapRow(ResultSet rs, int rowNum) throws SQLException {
				Client client =  new Client( );
				client.setId(rs.getString("id"));
				client.setName(rs.getString("name"));
				return client;
			}}); 
		 
	}
	/**
	 * Final JDBCTemplate Examples
	 * */
	
	/**
	 * Start JPA  Examples
	 * */

	@Transactional(readOnly=true)
	public List<Client> listAll()
	{		
		String jpl = "from Client";
		TypedQuery<Client> typedquery = entityManager.createQuery(jpl, Client.class);
		return typedquery.getResultList();		
		
	}

	@Transactional
	public Client insert(Client client)
	{		
		entityManager.persist(client);
		return client;
	}
	

	@Transactional
	public Client save(Client client)
	{		
		entityManager.merge(client);
		return client;
	}
	
	@Transactional
	public void delete(Client c)
	{		
		if(!entityManager.contains(c))
		{
			entityManager.merge(c);
		}
		entityManager.remove(c);
		
	}
	
	

	@Transactional
	public void deleteById(String id)
	{		
		Client client  = entityManager.find(Client.class, id);
		entityManager.remove(client);
		
	}
	

	@Transactional(readOnly=true)
	public List<Client> searchByName(String name)
	{		
		String jpl = "select c from Client c where name = :name";
		TypedQuery<Client> typedquery = entityManager.createQuery(jpl, Client.class);
		typedquery.setParameter("name", "%" + name + "%");
		return typedquery.getResultList();
		
		
	}
	
	/**
	 * End JPA  Examples
	 * */
}
