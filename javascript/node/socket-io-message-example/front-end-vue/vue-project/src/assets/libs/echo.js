import {io} from "socket.io-client"; 
const socket = io("localhost:3000");
socket.on("echo",(value)=>{
    console.log("Retorno do server : " + value);
});

export function byLib(value){
    console.log("Echo by lib : " + value);
}

export function bySocketIO(value){ 
    socket.emit("echo",value ); 
}