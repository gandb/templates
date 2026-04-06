package main

import "fmt"


type Endereco struct {
    Rua string
} 

type Pessoa struct {
    Nome string
    Idade int
	Endereco // Embedding
}

func main() {
   p := Pessoa{Endereco:Endereco{Rua: "Tv Chaves de Oliveira"} ,Nome: "João", Idade: 30}
   fmt.Println(p.Nome) // João 
   fmt.Println(p) // João 
   
   // Array fixo, obrigatório declarar com var
	var arr [3]int = [3]int{1, 2, 3}
	fmt.Println(arr) 

	// Slice dinâmico, obrigatório declar com a anotação :=
	slice := []int{4, 5}
	slice = append(slice, 6) // Adiciona  
	fmt.Println(slice) 
	
	//mapa
	m := make(map[string]int)
	m["chave"] = 42
	fmt.Println(m["chave"]) // 42  

	
}
