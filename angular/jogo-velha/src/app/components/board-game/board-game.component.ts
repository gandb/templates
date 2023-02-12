import { Component, Input, Output,EventEmitter } from '@angular/core';
import { BoardGameOnClick } from './board-game-onclick';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent {
  @Input()
  data:Array<Array<number>> = [];
  @Output()
  click =   new EventEmitter<BoardGameOnClick>();

  ngOnInit() {
    if(this.data.length==0)
    {
      this.data = Array(3).fill(Array(3).fill(0));
    }
  }

  onClick(event:Event,x:number,y:number){
    event.preventDefault();
    event.stopPropagation();
    this.click.emit({x,y});
  }

  calcPlayer(x:number,y:number)
  {
    const data:number = this.data[x][y];
    return (data<0)?"X":(data>0)?"O":"";
  }

}
