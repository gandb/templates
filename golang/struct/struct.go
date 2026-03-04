package main

import (
	"fmt"
	"strconv"
)

func arraysTest() {

	fmt.Println("Iniciando teste com arrays: ")
	var pessoas [3]string
	pessoas = [3]string{"Ana", "João", "Maria"}

	fmt.Println("Listando o nome das pessoas no array: ")

	for _, pessoa := range pessoas {
		fmt.Println("A pessoa é " + pessoa)
	}

	fmt.Println("Listando o nome das pessoas no array com index: ")

	for index, pessoa := range pessoas {
		fmt.Println("A pessoa número " + strconv.Itoa(index) + " é " + pessoa)
	}

	fmt.Println("Listando pessoas de um array usando for tradicional: ")

	for index := 0; index < len(pessoas); index++ {
		fmt.Println("A pessoa número " + strconv.Itoa(index) + " é " + pessoas[index])
	}

	return
}

func mapsTest() {
	fmt.Println("Iniciando teste com mapas: ")
	pessoas := map[int]string{25: "Ana", 45: "João", 30: "José"}

	fmt.Println("Listando o nome das pessoas no mapa: ")

	for _, pessoa := range pessoas {
		fmt.Println("A pessoa é " + pessoa)
	}

	fmt.Println("Listando o nome das pessoas no mapa com index: ")

	for index, pessoa := range pessoas {
		fmt.Println("A pessoa com idade " + strconv.Itoa(index) + " é " + pessoa)
	}

	fmt.Println("Listando pessoas de um mapa usando for tradicional: ")

	for index := 0; index < len(pessoas); index++ {
		fmt.Println("A pessoa número " + strconv.Itoa(index) + " é " + pessoas[index])
	}

	return
}

func main() {
	fmt.Println("Teste com estruturas iniciais: ")
	arraysTest()
	mapsTest()
}
