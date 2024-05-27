 

import express from 'express';
import path from 'path'; 

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const port = 3000;

// Obter __dirname em um módulo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão que carrega o 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});