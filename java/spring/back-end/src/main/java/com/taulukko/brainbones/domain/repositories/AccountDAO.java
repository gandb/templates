package com.taulukko.brainbones.domain.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taulukko.brainbones.domain.entity.Account;

/*
 * Usando Spring e hibernate existem 3 tipos de acesso à banco de dados:
 * JDBC Template
 * JPA
 * Spring JPA Data
 * 
 * Esta interface exemplifica o último que é o mais usado no mercado
 * */

public interface AccountDAO extends JpaRepository<Account, String> {

	Optional<Account> findOneByUsername(String name);
}
