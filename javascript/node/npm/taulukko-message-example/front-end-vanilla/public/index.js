 
import  {echo}  from "./lib.js";
 
const time = 0;

 
const btnEchoLib =  document.getElementsByClassName("btnEchoLib")[0];
const btnSocketIO =  document.getElementsByClassName("btnSocketIO")[0];
const txtOutput =  document.getElementsByClassName("output")[0];
  
function output(message){
  txtOutput.innerHTML = JSON.stringify( message);
}
 

const publisher = taulukko_messages_client.Publisher.create({topics:["echo"]}); 
const subscriber = taulukko_messages_client.Subscriber.create({topics:["echo"]});
 
await subscriber.open();
await publisher.open(); 
await subscriber.on((message)=>output(message));
 

 
btnEchoLib.onclick = echoFromLib; 
btnSocketIO.onclick = echoFromSocketIO;


function echoFromLib(){ 
  output(echo("Hello World 1")); 
}
 

async function echoFromSocketIO(){
  await publisher.send("teste enviado pro servidor");
  time = 60000;
}
 
