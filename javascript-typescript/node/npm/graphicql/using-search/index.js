 

import express from 'express';
import path from 'path'; 

import { fileURLToPath } from 'url';
import { dirname } from 'path';

  

 
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import bodyParser from 'body-parser';


const usuarios = [
  { id: 1, nome: 'Edson', email: 'edson@example.com' },
  { id: 2, nome: 'Ana', email: 'ana@example.com' },
  { id: 3, nome: 'Carlos', email: 'carlos@example.com' }
];



// Schema GraphQL (esta forma em texto é mais simples, não é funcional e menos verborrágica que a outra)
 
const typeDefs = `
  type Usuario {
    id: Int
    nome: String
    email: String
  }

  type Query {
    usuario(id: Int!): Usuario
    usuarios: [Usuario]
  }
`;


// Resolvers
const resolvers = {
  Query: {
    usuario: (_, { id }) => usuarios.find(u => u.id === id),
    usuarios: () => usuarios,
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
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ usuario(id:2){id nome} }"}'

  Retorna : {"data":{"usuario":{"id":2,"nome":"Ana"}}}


  ou 

  curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ usuarios {id nome} }"}'

  Retorna:{"data":{"usuarios":[{"id":1,"nome":"Edson"},{"id":2,"nome":"Ana"},{"id":3,"nome":"Carlos"}]}}

  
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

 