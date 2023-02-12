import { Component, OnInit } from '@angular/core';
import { SelectorPlayerEventOnChange } from '../selector-player/seletor-player-event-on-change';
import { calc, runForXTimes } from "../../model/ai/ai"
import { JogoVelha, STATE_END, STATE_PLAYING, STATE_START } from 'src/app/model/jogo-velha/jogo-velha';
import { BoardGameOnClick } from '../board-game/board-game-onclick';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss']
})
export class JogoDaVelhaComponent implements OnInit {

  players: Number = 1;
  boardgameData: Array<Array<number>> = [];
  y: number = 0;
  x: string = "";
  game: JogoVelha = new JogoVelha();
  status:string="Jogo não iniciado";

  constructor() { }

  ngOnInit(): void {
    if (this.boardgameData.length == 0) {
      this.boardgameData = Array(3).fill(Array(3).fill(0));
    }
  }

  async onClick() {
    if (isNaN(this.x as any)) {
      alert("X precisa ser numérico");
      return;
    }
    console.log("this.x", this.x);
    this.y = await calc(parseInt(this.x));
  }

  async onTreinar() {
    if (isNaN(this.x as any)) {
      alert("X precisa ser numérico");
      return;
    }
    console.log("this.x", this.x);
    await runForXTimes(parseInt(this.x));
  }

  onBoardGameClick(event:BoardGameOnClick)
  {
    if(this.game.state != STATE_PLAYING)
    {
      return;
    }
    this.game.play(event.x,event.y);

  }

  getActivePlayer():string
  {
    return (this.game.activePlayer<0)?"Jogador 1":"Jogador 2";
  }

  getPlayerWin():string
  {
    return (this.game.playerWin<0)?"Jogador 1":(this.game.playerWin==0)?"Empate":"Jogador 2";
  }

  onNewGame(){
    this.game.newGame();
    console.log(this.status,this.game.state );
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
          return "Jogador " + this.getPlayerWin() + " ganhou!";
        }
      }
    }
    return (this.game.state == STATE_PLAYING) ? "Turno do jogador " + this.getActivePlayer() :   "Jogo não iniciado";
  }

  onSelectPlayers(event: SelectorPlayerEventOnChange) {
    this.players = event.players;
  }
}
