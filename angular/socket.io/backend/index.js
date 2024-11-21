const http = require('http');
const { Server } = require('socket.io');

// Criar servidor HTTP
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor Socket.IO em execução\n');
});

// Inicializar o Socket.IO
const io = new Server(server);

// Configurar evento de conexão
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Escutar mensagens enviadas pelo cliente
    socket.on('message', (data) => {
        console.log('Mensagem recebida:', data);

        // Responder com a mesma mensagem
        socket.emit('message', `Echo: ${data}`);
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