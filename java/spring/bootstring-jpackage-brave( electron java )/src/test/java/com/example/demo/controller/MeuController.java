package com.example.demo.controller;

import com.example.demo.Pessoa;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")  // Prefixo para todas as rotas deste controller
public class MeuController {

    // Exemplo 1: GET simples
    @GetMapping("/ola")
    public String dizerOla() {
        return "Olá, Spring Boot!";
    }

    // Exemplo 2: GET com parâmetro
    @GetMapping("/saudacao/{nome}")
    public String saudar(@PathVariable String nome) {
        return "Olá, " + nome + "!";
    }

    // Exemplo 3: POST com corpo JSON
    @PostMapping("/pessoa")
    public Pessoa criarPessoa(@RequestBody Pessoa pessoa) {
        return pessoa;
    }
}
