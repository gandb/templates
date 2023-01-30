package com.taulukko.brainbones.controllers.example;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.taulukko.brainbones.domain.entity.example.Client;
import com.taulukko.brainbones.domain.repositories.example.ClientDAO;
import com.taulukko.brainbones.services.example.TestService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/client")
@Api("Client")
public class ClientController {

	@Autowired
	private ClientDAO clients;
	@Autowired
	private TestService service;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public String insert(@Valid @RequestBody Client client) { 
		client.setId(UUID.randomUUID().toString()); 
		clients.save (client);
		return "Cliente inserido com sucesso";

	}

	 
	
	@GetMapping("/listAll")
	@ApiOperation("list All clients")
	@ApiResponses({
		@ApiResponse(code = 200, message = "List success"),
		@ApiResponse(code = 503, message = "Server off")
	})
	public List<Client> listAll( )   {

		return clients.findAll();
		
	}
	
	@GetMapping("/listallWithOrders")
	public List<Client> listallWithOrders() throws SQLException {

		return clients.listarClientesComPedidos();

	}
	@ApiOperation("list clients by name")
	@ApiResponses({
		@ApiResponse(code = 200, message = "List success"),
		@ApiResponse(code = 503, message = "Server off")
	})
	@GetMapping("/find/{name}")
	public List<Client> findByName(@ApiParam("name or start of the name") @PathVariable("name") String name) throws SQLException {

		return clients.encontrarNativoClientesQueComecamCom(name);

	}

	@GetMapping("/helloworld")
	public String helloWorld() {
		return "Hello World";
	}
	

	@GetMapping("/findById/{id}")
	public  Client getById(@PathVariable  String id) {
		return clients.findById(id).orElseThrow(
				()->  new ResponseStatusException( HttpStatus.NOT_FOUND, "Client not found"));
 
	}
	

	@GetMapping("/filter")
	public List<Client>  filter(@RequestBody Client filtro) {
		
		//naquele tipo de busca que geralmente se envia o cpf busca por cpf, se envia nome busca por nome e assim por diante, a estratégia é esta
		ExampleMatcher exampleMatcher = ExampleMatcher
				.matching()
				.withIgnoreCase()
				.withStringMatcher(ExampleMatcher.StringMatcher.STARTING);
		
		Example<Client> example = Example.of(filtro,exampleMatcher);
		
		return clients.findAll(example);
		 
	}
}
