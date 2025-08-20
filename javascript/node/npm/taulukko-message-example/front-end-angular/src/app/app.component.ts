import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Publisher,Subscriber,Listener,Message} from "taulukko-messages-client";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taulukko-messages-example-angular';
  output:string = ""; 
  subscriber:Subscriber= Subscriber.create({topics:["echo-angular"]});
  publisher:Publisher= Publisher.create({topics:["echo-angular"]});


    constructor(){
        (async ()=>{
        await this.subscriber.open();
        await this.publisher.open();
        const listener:Listener  =async (message:Message)=>{
          this.output = "Recebido da API:" + message.data;
        };
        this.subscriber.on(listener);
      })();
  }

  byEchoFunction (message:string){
    this.output = "Recebido da Função:" + message;
  }

  byAPI (message:string){
    this.publisher.send(message);
  }

}
