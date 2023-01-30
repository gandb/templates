import { Component, OnInit } from '@angular/core';
import {calc,runForXTimes} from "./ai"

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss']
})
export class JogoDaVelhaComponent implements OnInit {

  y:number=0;
  x:string="";

  constructor() { }

  ngOnInit(): void {
  }

  async onClick(){
    if(isNaN(this.x as any))
    {
      alert("X precisa ser numérico");
      return;
    }
    console.log("this.x",this.x);
    this.y= await calc(parseInt(this.x));
  }

  async onTreinar(){
    if(isNaN(this.x as any))
    {
      alert("X precisa ser numérico");
      return;
    }
    console.log("this.x",this.x);
    await runForXTimes(parseInt(this.x));
  }
}
