import { server as WebSocketServer } from "websocket";
import * as http from "http";
const originIsAllowed = (origin) => {
    // put logic here to detect whether the specified origin is allowed.
    return true;
};
export default function openConnection() {
    //TODO: Corrigir a conexao , falta
    // [1] ETAPA 1 , [2] ETAPA 2 , [3] ETAPA 3
    //1- deixar generico por campanha [1]
    //1.1 - tornar a porta configurável num arquivo de config. [1]
    //1.2 - tornar fácil recuperar a conexao pelo id de campanha e usuario [1]
    //1.3 - tornar fácil fazer um sendAll para todos da campanha [1]
    //2- criar um protocolo de comunicação por funcoes e parametros remotos  [1] [2]
    //2.1 - criar funcao remota addTextMessage + args  [1]
    //2.2 - criar funcao remota addPlayer + args  [2]
    //2.3 - criar funcao remota removePlayer + args   [2]
    //2.4 - criar funcao remota sendSoundMessage + args  [3]
    //2.5 - criar funcao remota addRollMessage + args  [2]
    //2.6- - criar funcao no servidor keepalive  [1]
    //2.6.1 - sem argumentos mas se der erro tem que desligar a comunicacao  [1]
    //2.7- - criar funcao no servidor sendMesssageText + args  [1]
    //2.8- - criar funcao no servidor sendMesssageSound + args  [3]
    //2.9- - criar funcao no servidor sendRoll+ args  [2]
    //2.10- - criar funcao no servidor sendPrivateRoll+ args  [2]
    //2.10- - criar funcao no servidor sendPrivateMessage+ args  [2]
    //3-  reativacao, se tiver erro pela conexao tiver sido previamente desligada [1]
    //3.1 - deve mostrar uma mensagem quando cair a conexao  [1]
    //3.2 - deve mostrar uma mensagem quando estiver se reconectando  [1]
    //3.3 - a reconexao deve voltar o objeto game como se o jogador tivesse acabado de entrar no jogo  [1]
    //3.4 - 
    const server = http.createServer((request, response) => {
        console.log((new Date()) + ' Received request for ' + request.url);
        response.writeHead(404);
        response.end();
    });
    server.listen(7712, () => {
        console.log((new Date()) + ' Game Server is listening on port 7712');
    });
    const wsServer = new WebSocketServer({
        httpServer: server,
        // You should not use autoAcceptConnections for production
        // applications, as it defeats all standard cross-origin protection
        // facilities built into the protocol and the browser.  You should
        // *always* verify the connection's origin and decide whether or not
        // to accept it.
        autoAcceptConnections: false
    });
    wsServer.on('request', (request) => {
        console.log((new Date()) + ' Connection on request.');
        if (!originIsAllowed(request.origin)) {
            // Make sure we only accept requests from an allowed origin
            request.reject();
            console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
            return;
        }
        let connection = request.accept('echo-protocol', request.origin);
        console.log((new Date()) + ' Connection accepted.');
        connection.on('message', (message) => {
            if (message.type === 'utf8') {
                console.log('Received Message: ' + message.utf8Data);
                connection.sendUTF(message.utf8Data);
            }
            else if (message.type === 'binary') {
                console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                connection.sendBytes(message.binaryData);
            }
        });
        connection.on('close', (reasonCode, description) => {
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    });
}
;
//# sourceMappingURL=tv2-server.js.map