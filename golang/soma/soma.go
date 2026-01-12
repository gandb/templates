package main

import "fmt"

// funcao que recebe dois inteiros e retorna a soma
func soma(a int, b int) int {
	return a + b
}

func main() {
	var x, y int

	fmt.Print("Digite o primeiro numero: ")
	fmt.Scanln(&x)

	fmt.Print("Digite o segundo numero: ")
	fmt.Scanln(&y)

	resultado := soma(x, y)

	fmt.Println("A soma é:", resultado)
}
