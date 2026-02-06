package com.ai.network;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Main {

    //fonte: https://youtu.be/w8yWXqWQYmU?si=py8gsLV2HGcjFRTC
    //fonte: https://youtu.be/d8U7ygZ48Sc?si=4UdTva_h7UjAzOxE

    public static void main(String[] args) { 
        
        Properties props = loadProperties();
        
        if (props == null) {
            help();
            return;
        }

        int bit1,bit2;
 
        try{
            bit1 = Integer.parseInt(props.getProperty("bit1", "0").trim());
            bit2 = Integer.parseInt(props.getProperty("bit2", "0").trim()); 
        } catch (NumberFormatException ex) {
            IO.println("Erro ao ler valores de configuração: " + ex.getMessage());
            return;
        }
        

        IO.println("Entradas:");
        IO.println("bit1: " + bit1);
        IO.println("bit2: " + bit2); 

        IO.println("Saída:" + executaAnd(bit1, bit2));
    }

    private static Properties loadProperties() {
        Properties props = new Properties();
        try (InputStream input = Main.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                IO.println("Erro: arquivo config.properties não encontrado!");
                return null;
            }
            props.load(input);
            return props;
        } catch (IOException ex) {
            IO.println("Erro ao carregar config.properties: " + ex.getMessage());
            return null;
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

	public static int executaAnd(int x0, int x1) {

		// pesos individuais
		float w[] = new float[2]; 

		// pesos calibrados para AND
		w[0] = 0.5f;
		w[1] = 0.5f;

 
		return executaGenerico(x0,x1,w);
	}
	
	
	public static int executaOr(int x0, int x1) {

		// pesos individuais
		float w[] = new float[2]; 

		// pesos calibrados para OR
		w[0] = 1f;
		w[1] = 1f;

 
		return executaGenerico(x0,x1,w);
	}
	
	public static int executaGenerico(int x0, int x1,float w[]) {
 
		// peso genérico
		float bias = 1;
 
		float somatoria = x0 * w[0] + x1 * w[1];
		// aplicando o peso global
		somatoria = somatoria * bias;

		return ativacao(somatoria);
	}


	//função de ativação
	private static int ativacao(float somatoria) {
		return (somatoria >= 1) ? 1 : 0;
	}


}
