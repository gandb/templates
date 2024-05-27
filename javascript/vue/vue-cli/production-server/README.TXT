


Servidor de produção  : 

Passo 1 -  Incluir no package.json nos scripts
  "start": "node main.js"

Passo 2 - Adicionar o arquivo main.js que está nesta pasta no seu projeto

Passo 3 - Instalar pacotes necessários
#npm install

Passo 4 - Gerar o build do seu projeto
#npm run build

Passo 5  - iniciar o projeto em modo produção
#npm run start


#CODIGO do main.js#
"use strict";
//https://www.npmjs.com/package/connect
var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var compression = require('compression');
const PRODUCTION_PATH = "dist";
 
//let cookieSession = require('cookie-session');
//let bodyParser = require('body-parser');
//configuracao
var DOMAIN_NAME = "localhost";
var PORT = 80;
//let DOMAIN_NAME = "valert.vriend.com.br";
var app = connect();
// gzip/deflate outgoing responses
app.use(compression());
/*/ store session state in browser cookie
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));*/
/*
// parse urlencoded request bodies into req.body
app.use(bodyParser.urlencoded({ extended: false }));
*/
function filterDonainNames(req, res, next) {
    console.log(req.headers.host.indexOf(DOMAIN_NAME));
    if (req.headers.host.indexOf(DOMAIN_NAME) < 0) {
        res.end('Domain not found!\n');
        return;
    }
    next();
}
function denied(req, res) {
    res.end('Hello from Connect!\n');
}
/// respond to all requests
app.use(filterDonainNames);
app.use(serveStatic("./" + PRODUCTION_PATH));
//create node.js http server and listen on port
http.createServer(app).listen(PORT, function () {
    console.log('Server running on ' + PORT + '...');
});
