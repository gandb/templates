package com.taulukko.brainbones.controllers.example;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.taulukko.brainbones.domain.entity.example.Order;
import com.taulukko.brainbones.domain.repositories.example.OrderDAO;
import com.taulukko.brainbones.dto.OrderDTO;

@RestController
@RequestMapping("/order")
public class OrderController {
 
	@Autowired
	private OrderDAO orders;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public String insert(Order order) { 
		orders.save(order);

		return "Order inserido com sucesso";

	}

	@GetMapping("/listall")
	public List<Order> listall() throws SQLException {

		return orders.findAll();

	}

	@GetMapping("/helloworld")
	public String helloWorld() {
		return "Hello World";
	}
	

	@GetMapping("/naoexiste")
	public boolean naoexiste() { 
		OrderDTO order = OrderDTO.builder().created(new Date()).name("nome dele").id("id dele").build();
		
		//outro jeito de trabalhar com exceção
		throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Ação inexistente:" + order.getName());
	} 
}
