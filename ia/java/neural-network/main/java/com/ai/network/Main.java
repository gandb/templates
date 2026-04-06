package com.ai.network;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class Main {

    List<Layer> layers = new ArrayList<>();

    //fonte: https://youtu.be/w8yWXqWQYmU?si=py8gsLV2HGcjFRTC
    //fonte: https://youtu.be/d8U7ygZ48Sc?si=4UdTva_h7UjAzOxE
    public static void main(String[] args) {

        Main main = new Main();
        main.start();
    }

    private Main() {

    }

    private void start() {

        try {
            Properties props = loadProperties();

            final int layersSize = Integer.parseInt(props.getProperty("layers", "0").trim());
            final String perceptionConfig = props.getProperty("perceptions", "1-" + layers).trim();

            List<String> perceptionConfigs = List.of(perceptionConfig.split(";"));
            if (perceptionConfigs.isEmpty()) {
                IO.println("Erro ao ler valores de configuração dos perceptions, deve obedecer a regra do help abaixo: ");
                help();
                return;
            }

            LayerConfig layerConfig = null;

            for (int index = 0; index < layersSize; index++) {
                if (layerConfig == null || layerConfig.lastLayer() == (index + 1)) {
                    layerConfig = loadNextLayerConfig(layerConfig, perceptionConfigs);
                }

                List<Perception> perceptions = new ArrayList<>();

                for (int perceptionIndex = 0; perceptionIndex < layerConfig.perceptions(); perceptionIndex++) {
                    Perception perception = new Perception((byte) 0, 0.5f, 1f);
                    perceptions.add(perception);
                }

                Layer layer = new Layer(perceptions);
                layers.add(layer);

            }

            IO.print(this.toString());

        } catch (NumberFormatException | IOException ex) {
            IO.println("Erro ao ler valores de configuração, layer deve ser numérico e perceptions deve obedecer a regra do help abaixo: " + ex.getMessage());
            help();
        }
    }

    public String toString() {
        StringBuilder ret = new StringBuilder();
        for (int index = 0; index < this.layers.size(); index++) {

            ret.append("\n===========================");
            ret.append("Layer " );
            ret.append( index + 1);
            ret.append("===========================");

            Layer layer = this.layers.get(index);
            for (int indexPerception = 0; indexPerception < layer.perceptions().size(); indexPerception++) {
                Perception perception = layer.perceptions().get(indexPerception);
                ret.append("\nPerception ");
                ret.append((indexPerception + 1));
                ret.append(" value : ");
                ret.append(perception.value());
                ret.append(",  weight : ");
                ret.append(perception.weight());
                ret.append(", bias : ");
                ret.append(perception.bias());
            } 

        }
        return ret.toString();
    }

    private Properties loadProperties() throws IOException {
        Properties props = new Properties();
        try (InputStream input = Main.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                IO.println("Erro: arquivo config.properties não encontrado!");
                return null;
            }
            props.load(input);
            return props;
        } catch (IOException ex) {
            throw ex;
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

        return executaGenerico(x0, x1, w);
    }

    public static int executaOr(int x0, int x1) {

        // pesos individuais
        float w[] = new float[2];

        // pesos calibrados para OR
        w[0] = 1f;
        w[1] = 1f;

        return executaGenerico(x0, x1, w);
    }

    public static int executaGenerico(int x0, int x1, float w[]) {

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

    private LayerConfig loadNextLayerConfig(LayerConfig active, final List<String> perceptionConfigs) throws IOException {
        if (active != null && active.nextIndexPerception() >= perceptionConfigs.size()) {
            throw new IOException("Erro ao ler valores de configuração dos perceptions, deve obedecer a regra do help abaixo: ");
        }
        int nextIndexPerception = (active == null) ? 0 : active.nextIndexPerception();

        String lastPerceptionConfig = perceptionConfigs.get(nextIndexPerception);
        List<String> lastPerceptionConfigProperties = List.of(lastPerceptionConfig.split("-"));
        if (lastPerceptionConfigProperties.size() != 2) {
            throw new IOException("Erro ao ler valores de configuração dos perceptions, deve obedecer a regra do help abaixo: ");
        }

        int perceptionConfigPerceptionNumbers = Integer.parseInt(lastPerceptionConfigProperties.get(1));
        int perceptionConfigPerceptionLastLayer = Integer.parseInt(lastPerceptionConfigProperties.get(0));
        return new LayerConfig(perceptionConfigPerceptionLastLayer, perceptionConfigPerceptionNumbers, nextIndexPerception + 1);
    }

}
