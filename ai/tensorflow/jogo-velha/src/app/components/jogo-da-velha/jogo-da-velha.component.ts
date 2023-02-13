import { Component, OnInit } from '@angular/core';
import { SelectorPlayerEventOnChange } from '../selector-player/seletor-player-event-on-change';
import { JogoDaVelhaAI } from "../../model/ai/ai"
import { JogoVelha, STATE_END, STATE_PLAYING, STATE_START } from 'src/app/model/jogo-velha/jogo-velha';
import { BoardGameOnClick } from '../board-game/board-game-onclick';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss']
})
export class JogoDaVelhaComponent implements OnInit {

  players: number = 1;
  playersChoosed:number = 1;
  boardgameData: Array<Array<number>> = [];
  y: number = 0;
  x: string = "";
  game: JogoVelha = new JogoVelha();
  status:string="Jogo não iniciado";
  aiPlayer:number=0;
  ai:JogoDaVelhaAI = ((undefined as  any) as JogoDaVelhaAI);
  output:string="";

  constructor() { }

  ngOnInit(): void {
    if (this.boardgameData.length == 0) {
      this.boardgameData = Array(3).fill(Array(3).fill(0));
    }

    window.document.addEventListener("JogoDaVelhaAILog",(e:any)=>{
      this.output = this.output + "\n" + e.detail.text;
    });

    this.ai = new JogoDaVelhaAI(this.game);
    this.onNewGame();
  }

  async onClick() {
    if (isNaN(this.x as any)) {
      alert("X precisa ser numérico");
      return;
    }

  }

  async onTreinar() {
    if (isNaN(this.x as any)) {
      alert("X precisa ser numérico");
      return;
    }

  }

  onBoardGameClick(event:BoardGameOnClick)
  {
    if(this.game.state != STATE_PLAYING)
    {
      return;
    }

    if(this.game.activePlayer==this.aiPlayer && this.playersChoosed == 1)
    {
      return;
    }

    this.game.play(event.x,event.y);

    if(this.game.state!=STATE_END)
    {
      this.ai.play();
    }

  }

  get turn():string{
    if(this.isHumanVsComputer)
    {
      if(this.game.activePlayer==this.aiPlayer)
      {

        return  "Turno do Computador!";
      }
      return "Turno do humano!";


    }

    if(this.game.activePlayer==0)
    {
      return  "Turno do jogador 1!";
    }

    return  "Turno do jogador 2";

  }

  get versusPlayerLabel ():string{
    if(this.playersChoosed==2)
    {
        return  "Jogador 1 X Vs Jogador 2 O";
    }

    if(this.aiPlayer==-1)
    {
      return  "Computador X Vs Humano O";
    }


    return  "Humano X Vs Computador O";

  }

  getActivePlayer():string
  {
    return (this.game.activePlayer<0)?"Jogador 1":"Jogador 2";
  }

  getPlayerWin():string
  {
    if(this.isHumanVsComputer)
    {
      if(this.aiPlayer  == this.game.playerWin)
      {
        console.log("this.game.playerWin",this.game.playerWin);
        console.log("this.aiPlayer",this.aiPlayer);
        return "Computador";
      }
      return "Humano";
    }

    return (this.game.playerWin<0)?"Jogador 1":"Jogador 2";
  }

  get isHumanVsComputer():boolean
  {
    return this.playersChoosed == 1;
  }

  onNewGame(){
    this.game.newGame();
    this.playersChoosed = this.players;
    if(!this.isHumanVsComputer)
    {
      return;
    }

    this.aiPlayer = Math.round(Math.random())*2-1;

    console.log("this.aiPlayer",this.aiPlayer);
    if(this.aiPlayer==-1)
    {
      this.ai.play();
    }
  }

  calcStatus() {
    if(this.game.state == STATE_END)
    {
      switch(this.game.playerWin)
      {
        case 0:
        {
          return "Ocorreu um empate!";
        }
        default:{
          return  this.getPlayerWin() + " ganhou!";
        }
      }
    }
    if (this.game.state != STATE_PLAYING) {
      return "Jogo não iniciado";
    }

    if(this.isHumanVsComputer)
    {
      if(this.game.activePlayer==this.aiPlayer)
      {
        return "Turno do Computador";
      }
      return "Turno do Humano";
    }
    return "Turno do jogador " + this.getActivePlayer();

  }

  onSelectPlayers(event: SelectorPlayerEventOnChange) {
    this.players = event.players;
  }
}
