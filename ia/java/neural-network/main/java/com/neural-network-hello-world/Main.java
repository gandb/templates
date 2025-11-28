package com.adivinhaquemsoueu;

public class Main {

    //fonte: https://youtu.be/w8yWXqWQYmU?si=py8gsLV2HGcjFRTC
    //fonte: https://youtu.be/d8U7ygZ48Sc?si=4UdTva_h7UjAzOxE

    public static void main(String[] args) { 
        
        if(args.length==0)
        {
            help();
            return;
        }
 
        for (int i = 1; i <= 5; i++) {
             IO.println("i = " + i);
        }
    }

    private static void help() {
        IO.println("Este exemplo é um exemplo de rede neural com 3 camadas [0-2] com 784 perceptons de entrada");
        IO.println("Abaixo o modelo de como funciona a ligação entre as camadas:"); 
        IO.println("""
            CAMADAS

    0-entrada 1-oculta 2-saída
    ┌───────────────────────┐           
    │    ------o ---        │ 
    │   /   /       \\       │ 
    │ o----/---o-----\\      │ 
    │  /\\ /           \\     │ 
    │ o--/-----o--------o   │ 
    │ /\\/ \\           /     │ 
    │ o/-------o------/     │
    │  \\ \\  \\      /        │ 
    │   -------o-----       │ 
    └───────────────────────┘ 
            """);
        IO.println("Repare que cada círculo representa um percepton, e cada linha entre os perceptons representam os pesos.");
        IO.println("E cada perceptrom de uma camada se liga a todos os perceptrons da camada seguinte.");
        IO.println("Para entender mais sobre um perceptron, estude o template/ai/java/perceptron para mais informacoes.");
        IO.println("Toda rede neural é treinada pra algo, esta vai ser treinada pra classificar digitos e não dígitos,");
        IO.println("para treinamento, usaremos a coleção");
 
    }
}