import { Injectable } from '@angular/core'; 
import {Publisher,Subscriber} from "taulukko-messages-client";

@Injectable({
  providedIn: 'root'
})
export class MyLibService {
  
  active:boolean = false;
  publisher:Publisher;
  subscriber:Subscriber;
  count:number=1;
  constructor() { 
    this.publisher = Publisher.create({
      topics: ["topic.simpleMessage"] // Only specify the topic
    });
    this.subscriber = Subscriber.create({
      topics: ["topic.simpleMessage"] // Only specify the topic
    });

    this.publisher.open().then(()=>{
      console.log("Publisher aberto");
    });

    
    this.subscriber.open().then(()=>{
      console.log("Subscriber aberto");

      this.subscriber.on(async (message)=>{
          console.log("Subscriber recebeu isto:",message);
      });
    });


 
    console.log('constructor: MyLibService ...'); 
  }

  publish(s:String)
  {
    this.publisher.send("Isto é uma mensagem enviada pelo publisher");
  }
 
}
