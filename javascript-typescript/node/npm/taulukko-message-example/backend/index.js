 
const {Server} = require("taulukko-messages");
 
// Configuração do Taulukko Message
const server =  Server.create();

server.open().then(()=>{
  console.log("Server iniciado :",server);
});


setInterval(()=>{
  console.log("Server no ar, serverdata:" , server.data);
},60000);
