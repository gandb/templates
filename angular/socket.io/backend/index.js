const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const cors = require('cors');


const app = express();

 



// Criar servidor HTTP
const server = http.createServer(app);

app.use(cors({
    origin: '*', // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Permite todos os métodos HTTP
    allowedHeaders: '*', // Permite qualquer cabeçalho
    credentials: true // Habilita cookies se necessário
  }));
 
// Configuração do Socket.IO
const io = new Server(server, {
    cors: {
      origin: '*', // Permite qualquer porta do localhost
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: '*', // Permite qualquer cabeçalho
      credentials: true // Habilita cookies se necessário
    }
  });


// Configurar evento de conexão
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Escutar mensagens enviadas pelo cliente
    socket.on('echo', (data) => {
        console.log('Mensagem recebida:', data);

        // Responder com a mesma mensagem
        socket.emit('echo', `Echo: ${data}`);
    });

    // Lidar com desconexão
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Iniciar o servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor Socket.IO rodando em http://localhost:${PORT}`);
});