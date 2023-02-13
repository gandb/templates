 export const STATE_START:number = 0 ;
 export const STATE_PLAYING:number = 1 ;
 export const STATE_END:number = 2 ;

export class JogoVelha{
  private _data: Array<Array<number>> = new Array(3).fill(new Array(3).fill(0));


  private out ;
  private _state: number = STATE_START;//new Game

  private _activePlayer = -1;
  private _playerWin = 0;



  constructor(out=console){
    this.out=out;
  }
  public get playerWin() {
    return this._playerWin;
  }
  private set playerWin(value) {
    this._playerWin = value;
  }
  public get activePlayer() {
    return this._activePlayer;
  }
  private set activePlayer(value) {
    this._activePlayer = value;
  }
  public get state(): number {
    return this._state;
  }
  private set state(value: number) {
    this._state = value;
  }

  public get data(): Array<Array<number>> {
    const ret: Array<Array<number>> = new Array(3).fill(new Array(3).fill(0));
    ret.splice(0, 3, ...this._data);
    return this._data;
  }

  private set data(value) {
    this._data = value;
  }


  validatePlay(x:number,y:number)
  {
    const isGameOver:boolean = this.state==STATE_END;
    if(isGameOver)
    {
      throw new Error("GAME_OVER");
    }
    const isEmpty:boolean  = this.data[x][y]==0;
    if(!isEmpty)
    {
      throw new Error("CELL_ALREADY_CHOOSED");
    }

  }

  validateGameOver()
  {
    console.log("validateGameOver.inicial",this.state);
    this.validateGameOverInLines();
    console.log("validateGameOver.validateGameOverInLines",this.state);
    this.validateGameOverInDiagonals();
    console.log("validateGameOver.validateGameOverInDiagonals",this.state);
    this.validateTie();
    console.log("validateGameOver.validateTie",this.state);

  }

  validateTie()
  {
    if(this.state == STATE_END)
    {
      return;
    }
    const map = this.data.map( (i)=> i.find((j)=>j==0) ).find((h)=>h==0);
    const inGame=map!=undefined;
    if(!inGame)
    {
      this.state = STATE_END;
      this.playerWin = 0;
    }
  }

  validateGameOverInDiagonals(){
    if(this.data[1][1]!=0&&this.data[1][1]==this.data[0][0] &&this.data[1][1]==this.data[2][2] )
    {
      this.state = STATE_END;
    }

    if(this.data[1][1]!=0&&this.data[1][1]==this.data[2][0] &&this.data[1][1]==this.data[0][2] )
    {
      this.state = STATE_END;
    }

    if(this.state==STATE_END)
    {
      this.playerWin = this.activePlayer;
    }

  }

  validateGameOverInLines()
  {
    for(let y=0;y<3;y++)
    {
      if(this.data[0][y]!=0 && this.data[0][y]==this.data[1][y] && this.data[1][y] ==this.data[2][y])
      {
         this.state = STATE_END;
      }
    }

    for(let x=0;x<3;x++)
    {
      if(this.data[x][0] != 0 && this.data[x][0]==this.data[x][1] && this.data[x][1] ==this.data[x][2])
      {
         this.state = STATE_END;
      }
    }

    if(this.state==STATE_END)
    {
      this.playerWin = this.activePlayer;
    }

  }

  play(x:number,y:number)
  {
    this.validatePlay(x,y);
    const updatedData = this.data.map((row, i) => row.map((col:number, j:number) => (i === x && j === y) ? this.activePlayer : col));
    this.data.splice(0, 3, ...updatedData);
    this.state = STATE_PLAYING;
    this.validateGameOver();
    if(this.state==STATE_PLAYING)
    {
      this.activePlayer = (this.activePlayer<0)?1:-1;
    }
  }

  newGame(){
    this.state = STATE_PLAYING;
    this.data = new Array(3).fill(new Array(3).fill(0));
    this.activePlayer=-1;
    this.playerWin=0;
  }

  print(plus:string=""):void
  {
    if(plus)
    {
      this.out.log(plus);
    }
    this.out.log("Active Player ",this.activePlayer);
    this.out.log("State  ",this.state);
    this.out.log(this.data);
  }
}
