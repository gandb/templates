package org.example;

import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.StaticDataFetcher;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

public class Main{

    public static void main(String[] args) {
        // 1. Definir o Schema GraphQL (SDL)
        String schemaSDL = "type Query {\n" +
                "  usuarioPorId(id: ID!): Usuario\n" +
                "  todosUsuarios: [Usuario]\n" +
                "}\n" +
                "\n" +
                "type Usuario {\n" +
                "  id: ID!\n" +
                "  nome: String!\n" +
                "  email: String!\n" +
                "  idade: Int\n" +
                "}";

        // 2. Parse do Schema
        SchemaParser schemaParser = new SchemaParser();
        TypeDefinitionRegistry typeRegistry = schemaParser.parse(schemaSDL);

        // 3. Configurar como os dados são buscados (Data Fetching)
        RuntimeWiring wiring = newRuntimeWiring()
                .type("Query", builder -> builder
                        .dataFetcher("usuarioPorId", environment -> {
                            String id = environment.getArgument("id");
                            // Dados fixos - simulando busca
                            if ("1".equals(id)) {
                                return new Usuario("1", "João Silva", "joao@email.com", 30);
                            } else if ("2".equals(id)) {
                                return new Usuario("2", "Maria Santos", "maria@email.com", 25);
                            }
                            return null;
                        })
                        .dataFetcher("todosUsuarios", environment ->
                                java.util.List.of(
                                        new Usuario("1", "João Silva", "joao@email.com", 30),
                                        new Usuario("2", "Maria Santos", "maria@email.com", 25),
                                        new Usuario("3", "Pedro Alves", "pedro@email.com", 35)
                                )
                        )
                )
                .build();

        // 4. Criar o Schema Executável
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, wiring);

        // 5. Criar instância do GraphQL
        GraphQL graphQL = GraphQL.newGraphQL(graphQLSchema).build();

        // 6. Executar uma consulta por id, avisando que campos eu quero pra retornar
        String query = "{"
                + "  usuarioPorId(id: \"1\") {"
                + "    nome"
                + "    email"
                + "  }"
                + "}";

        ExecutionResult result = graphQL.execute(query);

        // 7. Mostrar resultado
        System.out.println(result.getData().toString());
        // Saída: {usuarioPorId={nome=João Silva, email=joao@email.com, idade=30}}
    }

    // Classe simples para representar o usuário
    static class Usuario {
        private String id;
        private String nome;
        private String email;
        private int idade;

        public Usuario(String id, String nome, String email, int idade) {
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.idade = idade;
        }

        // Getters são necessários para o GraphQL acessar os campos
        public String getId() { return id; }
        public String getNome() { return nome; }
        public String getEmail() { return email; }
        public int getIdade() { return idade; }
    }
}