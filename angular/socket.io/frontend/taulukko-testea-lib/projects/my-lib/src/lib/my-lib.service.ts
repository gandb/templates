import { Injectable } from '@angular/core';
import {io, Socket}  from  "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class MyLibService {
  
  active:boolean = false;
  socket:Socket;
  count:number=1;
  constructor() { 
    this.socket = io("http://localhost:3000");

    this.socket.on("echo", (s) => {
      console.log("Vindo do servidor: ", s);
    });

    console.log('constructor: MyLibService ...'); 
  }

  echo(s:String):String{
    this.socket.emit("echo",s);
    return "echo: " + s;
  }
}
