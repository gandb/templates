package org.example;

import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

public class Main {

    // Dados fixos para simular um banco de dados
    private static final List<Usuario> USUARIOS = Arrays.asList(
            new Usuario("1", "João Silva", "joao@email.com", 30, "São Paulo"),
            new Usuario("2", "Maria Santos", "maria@email.com", 25, "Rio de Janeiro"),
            new Usuario("3", "Pedro Costa", "pedro@email.com", 35, "São Paulo"),
            new Usuario("4", "Ana Oliveira", "ana@email.com", 28, "Belo Horizonte"),
            new Usuario("5", "Carlos Souza", "carlos@email.com", 40, "São Paulo")
    );

    public static void main(String[] args) {
        // 1. Definir o Schema GraphQL com filtros
        String schema = "type Query {\n" +
                "  hello: String\n" +
                "  usuarios: [Usuario]\n" +
                "  usuariosPorCidade(cidade: String!): [Usuario]\n" +
                "  usuariosPorIdadeMinima(idadeMinima: Int!): [Usuario]\n" +
                "  buscarUsuario(\n" +
                "    cidade: String\n" +
                "    idadeMinima: Int\n" +
                "    nomeContem: String\n" +
                "  ): [Usuario]\n" +
                "}\n" +
                "\n" +
                "type Usuario {\n" +
                "  id: ID!\n" +
                "  nome: String!\n" +
                "  email: String!\n" +
                "  idade: Int!\n" +
                "  cidade: String!\n" +
                "}";

        // 2. Parse do Schema
        SchemaParser schemaParser = new SchemaParser();
        TypeDefinitionRegistry typeRegistry = schemaParser.parse(schema);

        // 3. Configurar Data Fetchers (incluindo filtros)
        RuntimeWiring wiring = newRuntimeWiring()
                .type("Query", builder -> builder
                        .dataFetcher("hello", environment -> "Hello GraphQL World! 🌍")
                        .dataFetcher("usuarios", environment -> USUARIOS)
                        .dataFetcher("usuariosPorCidade", environment -> {
                            String cidade = environment.getArgument("cidade");
                            return USUARIOS.stream()
                                    .filter(usuario -> usuario.getCidade().equalsIgnoreCase(cidade))
                                    .collect(Collectors.toList());
                        })
                        .dataFetcher("usuariosPorIdadeMinima", environment -> {
                            int idadeMinima = environment.getArgument("idadeMinima");
                            return USUARIOS.stream()
                                    .filter(usuario -> usuario.getIdade() >= idadeMinima)
                                    .collect(Collectors.toList());
                        })
                        .dataFetcher("buscarUsuario", environment -> {
                            // Filtro múltiplo (WHERE com vários critérios)
                            String cidade = environment.getArgument("cidade");
                            Integer idadeMinima = environment.getArgument("idadeMinima");
                            String nomeContem = environment.getArgument("nomeContem");

                            return USUARIOS.stream()
                                    .filter(usuario ->
                                            (cidade == null || usuario.getCidade().equalsIgnoreCase(cidade)) &&
                                                    (idadeMinima == null || usuario.getIdade() >= idadeMinima) &&
                                                    (nomeContem == null || usuario.getNome().toLowerCase().contains(nomeContem.toLowerCase()))
                                    )
                                    .collect(Collectors.toList());
                        })
                )
                .build();

        // 4. Criar Schema Executável
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, wiring);

        // 5. Criar instância GraphQL
        GraphQL graphQL = GraphQL.newGraphQL(graphQLSchema).build();

        // 6. EXEMPLOS DE CONSULTAS (QUERIES)

        // Consulta 1: Hello World simples
        System.out.println("=== CONSULTA 1: Hello World ===");
        String query1 = "{ hello }";
        ExecutionResult result1 = graphQL.execute(query1);
        Map map = result1.getData();
        map.forEach((key,value) -> {
            System.out.println( key.toString()+":"+value.toString());
        });

        System.out.println();

        // Consulta 2: Buscar todos os usuários
        System.out.println("=== CONSULTA 2: Todos os usuários ===");
        String query2 = "{\n" +
                "  usuarios {\n" +
                "    id\n" +
                "    nome\n" +
                "    cidade\n" +
                "    idade\n" +
                "  }\n" +
                "}";
        ExecutionResult result2 = graphQL.execute(query2);
        map = result2.getData();
        map.forEach((key,value) -> {
            System.out.println( key.toString()+":"+value.toString());
        });
        System.out.println();

        // Consulta 3: Filtro por cidade (WHERE cidade = 'São Paulo')
        System.out.println("=== CONSULTA 3: Filtro por cidade ===");
        String query3 = "{\n" +
                "  usuariosPorCidade(cidade: \"São Paulo\") {\n" +
                "    nome\n" +
                "    idade\n" +
                "    email\n" +
                "  }\n" +
                "}";
        ExecutionResult result3 = graphQL.execute(query3);
        map = result3.getData();
        map.forEach((key,value) -> {
            System.out.println( key.toString()+":"+value.toString());
        });
        System.out.println();

        // Consulta 4: Filtro por idade mínima (WHERE idade >= 30)
        System.out.println("=== CONSULTA 4: Filtro por idade mínima ===");
        String query4 = "{\n" +
                "  usuariosPorIdadeMinima(idadeMinima: 30) {\n" +
                "    nome\n" +
                "    idade\n" +
                "    cidade\n" +
                "  }\n" +
                "}";
        ExecutionResult result4 = graphQL.execute(query4);
        map = result4.getData();
        map.forEach((key,value) -> {
            System.out.println( key.toString()+":"+value.toString());
        });
        System.out.println();

        // Consulta 5: Filtro múltiplo (WHERE com vários critérios)
        System.out.println("=== CONSULTA 5: Filtro múltiplo ===");
        String query5 = "{\n" +
                "  buscarUsuario(cidade: \"São Paulo\", idadeMinima: 30, nomeContem: \"o\") {\n" +
                "    nome\n" +
                "    idade\n" +
                "    cidade\n" +
                "    email\n" +
                "  }\n" +
                "}";
        ExecutionResult result5 = graphQL.execute(query5);
        map = result5.getData();
        map.forEach((key,value) -> {
            System.out.println( key.toString()+":"+value.toString());
        });
        System.out.println();

        // Consulta 6: Filtro parcial (apenas alguns critérios)
        System.out.println("=== CONSULTA 6: Filtro parcial ===");
        String query6 = "{\n" +
                "  buscarUsuario(idadeMinima: 28, nomeContem: \"a\") {\n" +
                "    nome\n" +
                "    idade\n" +
                "    cidade\n" +
                "  }\n" +
                "}";
        ExecutionResult result6 = graphQL.execute(query6);
        map = result6.getData();
        map.forEach((key,value) -> {
            System.out.println( key.toString()+":"+value.toString());
        });

    }

    // Classe de domínio (Entity)
    static class Usuario {
        private String id;
        private String nome;
        private String email;
        private int idade;
        private String cidade;

        public Usuario(String id, String nome, String email, int idade, String cidade) {
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.idade = idade;
            this.cidade = cidade;
        }

        // Getters (obrigatórios para o GraphQL)
        public String getId() { return id; }
        public String getNome() { return nome; }
        public String getEmail() { return email; }
        public int getIdade() { return idade; }
        public String getCidade() { return cidade; }
    }
}