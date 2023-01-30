package com.taulukko.brainbones.domain.repositories.example;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taulukko.brainbones.domain.entity.example.Order;

public interface OrderDAO extends JpaRepository<Order,String >{

}
 