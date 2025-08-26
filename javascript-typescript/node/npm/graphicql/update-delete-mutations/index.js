 

import express from 'express';
import path from 'path'; 

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import  {v4 as uuidv4 } from 'uuid';

 
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import bodyParser from 'body-parser';


const usuarios = [
  { id: "1", nome: 'Edson', email: 'edson@example.com' },
  { id: "2", nome: 'Ana', email: 'ana@example.com' },
  { id: "3", nome: 'Carlos', email: 'carlos@example.com' }
];



// Schema GraphQL (esta forma em texto é mais simples, não é funcional e menos verborrágica que a outra)
//Dicas:
//String! significa que é obrigatório e não pode ser nulo
//[Usuario]  significa que retorna uma lista de objetos do tipo Usuario
 
const typeDefs = `
  type Usuario {
    id: String
    nome: String
    email: String
  }

  type Query {
    usuario(id: String!): Usuario
    usuarios: [Usuario]
  }

  input CreateUserInput {
    nome: String!
    email: String!
  }

  input UpdateUserInput {
    nome: String
    email: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): Usuario
    updateUser(id: ID!, input: UpdateUserInput!): Usuario
  }
`;


  // Resolvers
  const resolvers = {
    Query: {
      usuario: (_, { id }) => usuarios.find(u => u.id === id),
      usuarios: () => usuarios,
    },

    Mutation: {
      // CREATE - Inserir um novo usuário
      createUser: (parent, args) => {
        const newUser = {
          id: uuidv4(),
          nome: args.input.nome,
          email: args.input.email 
        };
        usuarios.push(newUser);
        return newUser;
      },
  
      updateUser: (parent, args) => {
        const userIndex = usuarios.findIndex(user => user.id === args.id);
        if (userIndex === -1) {
          throw new Error('User not found');
        }
        
        //merge using spread operator
        const updatedUser = {
          ...usuarios[userIndex],
          ...args.input
        };
        
        usuarios[userIndex] = updatedUser;
        return updatedUser;
      },
  
    }
  };


// Obter __dirname em um módulo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// Servir arquivos estáticos da pasta 'public'


// Rota padrão que carrega o 'index.html'
/**
 Chamada:
 Linux:
 //Querys

 //um especifico
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ usuario(id:\"2\"){id nome} }"}'

  Retorna : {"data":{"usuario":{"id":"2","nome":"Ana"}}}


  ou 

  //busca todos
  curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ usuarios {id nome} }"}'

  Retorna:{"data":{"usuarios":[{"id":1,"nome":"Edson"},{"id":2,"nome":"Ana"},{"id":3,"nome":"Carlos"}]}}

  //INSERT
 curl -X POST http://localhost:3000/graphql   -H "Content-Type: application/json"   -d '{                                   
    "query": "mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { id nome email } }",
    "variables": {
      "input": {
        "nome": "Novo Usuário",
        "email": "novo@email.com"
      }
    }
  }'



  //UPDATE
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { updateUser(id: \"1\", input: { nome: \"Novo Nome\", email: \"novo@email.com\" }) { id nome email } }"
  }'
   

 */

async function startServer() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(express.static(path.join(__dirname, 'public')));

  // Integrando Apollo com Express na rota /graphql
  app.use('/graphql', bodyParser.json(), expressMiddleware(server));

  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000/graphql');
  });
}

startServer();

 