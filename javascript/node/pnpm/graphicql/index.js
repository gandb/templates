 

import express from 'express';
import path from 'path'; 

import { fileURLToPath } from 'url';
import { dirname } from 'path';


import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/http';  

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    },
  }),
});


const app = express();
const port = 3000;

// Obter __dirname em um módulo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão que carrega o 'index.html'
/**
 Chamada:
 Linux:
 curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  --data '{"query":"{ hello }"}'
  Resposta esperada:
  {"data":{"hello":"world"}}
  Powershel:
  Invoke-RestMethod -Uri "http://localhost:3000/graphql" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"query":"{ hello }"}'
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.all('/graphql', createHandler({ schema }));


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});