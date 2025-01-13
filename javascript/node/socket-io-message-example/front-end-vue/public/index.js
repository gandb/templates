
 
import  {echo}  from "./lib.js";

const btnEchoLib =  document.getElementsByClassName("btnEchoLib")[0];
const btnSocketIO =  document.getElementsByClassName("btnSocketIO")[0];
 
btnEchoLib.onclick = echoFromLib;
btnSocketIO.onclick = echoFromSocketIO;
 
const socket = io("http://localhost:3000");

socket.on("echo", (s) => {
  console.log("Vindo do servidor: ", s);
});

function echoFromSocketIO(){ 
    socket.emit("echo","Hello World 2");
}

function echoFromLib(){
    console.log("teste1");
    console.log(echo("Hello World 1")); 
}

  