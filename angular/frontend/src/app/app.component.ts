import { Component } from '@angular/core';

import {Message, Subscriber} from "taulukko-messages";
import { Listener } from 'taulukko-messages/dist/src/subscriber/provider/subscriber-provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste';
  subscriber?:Subscriber;
  count:number=0;
  ngOnInit(): void {
    this.subscriber = Subscriber.create({topics:["keep-alive"]});
    this.subscriber.open().then(()=>{
      this.subscriber?.on(((message:Message)=>{
        this.count++;
      }) as Listener);
    });;
  }

  minhaFuncao() {
    console.log('Keep alive:' + this.count);
  }

}
