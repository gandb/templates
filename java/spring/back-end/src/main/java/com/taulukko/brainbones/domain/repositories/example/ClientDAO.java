package com.taulukko.brainbones.domain.repositories.example;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taulukko.brainbones.domain.entity.example.Client;
 
/*
 * Usando Spring e hibernate existem 3 tipos de acesso à banco de dados:
 * JDBC Template
 * JPA
 * Spring JPA Data
 * 
 * Esta interface exemplifica o último que é o mais usado no mercado
 * */
 
public interface ClientDAO extends JpaRepository<Client,String> {
	
	//busca relacional
	@Query(value = "SELECT c FROM Client c left join fetch c.orders")
	List<Client> listarClientesComPedidos();	
	@Query(value = "SELECT * FROM clients c where c.name like '%:name%'", nativeQuery = true)
	//repare que eu setei o nome do parametro desta vez, ai ele pode ser usado dentro de uma string
	List<Client> encontrarNativoClientesQueComecamCom(@Param("name") String name);
	@Query(value = "SELECT c FROM Client c where c.name like %:name%")
	List<Client> encontrarClientesQueComecamCom(String name);
	//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation
	//Pre configurados
	List<Client> findByNameLike(String name);
	List<Client> findByNameOrIdOrderById(String name,String id);
	Client findOneByName(String name);
	boolean existsById(String id);
	@Modifying //obrigatório pra quando tem alteração
	void deleteByName(String name);
}
