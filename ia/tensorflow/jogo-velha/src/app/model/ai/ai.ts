import * as tf from '@tensorflow/tfjs';
import {ModelPredictConfig,LayersModel} from '@tensorflow/tfjs';
import { JogoVelha,STATE_PLAYING } from '../jogo-velha/jogo-velha';
import {createHandler} from './localStorageHandler';
import { Move } from './move';

//https://www.tensorflow.org/js/guide/layers_for_keras_users

const IDLE:number=1;
const ONE_PLAYER_MODE:number=2;

export class JogoDaVelhaAI
{
  private model:tf.Sequential;
  private game:JogoVelha;
  private moves:Array<Move>=new Array();
  private isTraining:boolean=false;

  constructor(game:JogoVelha,model:tf.Sequential|undefined=undefined ){
    /**
     * Modelagem de entrada da rede neural:
     * Entrada : 3x3 (tratado, o computador sempre é o jogador 1 e é o próximo a jogar)
     * Camadas Ocultas de 8,4 e 2 bytes
     * Saída : X,Y
     */
    this.game = game;
    this.model = model as tf.Sequential;
    const isNewModel:boolean = model==undefined;
    if(! isNewModel)
    {
      return;
    }

    this.startAI();


  }

  startAI() {
    this.model =  tf.sequential();
    this.eventLog("Iniciando IA","INFO");
    this.eventLog("Criando modelo...","INFO");
    this.eventLog("Adicionando camadas...","INFO");
    this.model.add(tf.layers.dense({units: 9, useBias: true, activation: 'relu',inputShape:[9]}));
    this.eventLog("Camada de Entrada adicionada...","INFO");
    this.model.add(tf.layers.dense({units: 8, useBias: true, activation: 'relu'}));
    this.model.add(tf.layers.dense({units: 4, useBias: true, activation: 'relu'}));
    this.eventLog("Camadas intermediarias adicionadas...","INFO");
    this.model.add(tf.layers.dense({units: 2, useBias: true}));
    this.eventLog("Camada de Saída adicionada...","INFO");
    this.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    this.eventLog("Modelo compilado...","INFO");
  }

  startGame(){
    this.moves=new Array();
  }

  getTrainData(array:number[][],index:number,data:Array<number>):number[][]
  {
    let newData:number[] = [];
    data.forEach((value,indexa)=> newData[indexa]=value);
    array[index]=newData;
    return array;
  }

  async play(){
    this.eventLog( "Jogada iniciada","INFO");
    if(this.game.state!=STATE_PLAYING)
    {
      throw new Error("Game is not started");
    }
    let isAvaiable:boolean=false;
    this.eventLog( "Preparando dados:","INFO");
    const data2D:number[][] =  this.prepareDataWhereAIIsPlayerOne();
    const data:number[] = data2D.flat();
    this.eventLog( "Dados preparados...","INFO");
    while(!isAvaiable)
    {



      this.eventLog( "Iniciando predição...","INFO");

      const input = data.flat();

      //Note que o tensorf é 2d, porque o predict aceita um array de entradas pra gerar as saidas, entao pra um predict é sempre um array de [1,entrada]
      const sugest =await this.predict().with(tf.tensor2d([input]) );
      this.eventLog( "Sugestão dada :"+ JSON.stringify( sugest) + " para " + JSON.stringify(this.game.data),"INFO");
      isAvaiable=true;

      let playX:number = Math.round(sugest[0]);
      let playY:number = Math.round(sugest[1]);

      if(!this.validatePlay(playX,playY))
      {
        this.eventLog( "Sugestão dada (" + playX + "," + playY + ") é incorreta.","INFO");
        let randomPlay:number[] = this.findRandomPlay();
        playX = Math.round(randomPlay[0]);
        playY = Math.round(randomPlay[1]);
        this.eventLog( "Sugestão aleatória selecionada  (" + playX + "," + playY + ").","INFO");
      }
      this.eventLog( "Computador joga em (" + playX + "," + playY + ").","INFO");
      const move:Move = new Move(data2D,playX,playY);
      this.moves.push(move);
      this.game.play(playX,playY);
    }
  }
  findRandomPlay(): number[] {
    let count:number =0;
    this.game.data.flat().forEach((value)=>{
      if(value==0)
      {
        count++;
      }
    });
    let choosed:number = Math.round(Math.random()*(count-1));
    let choosedIndex:number = 0;
    let retX:number = -1;
    let retY:number = -1;
    this.game.data.forEach((ys,x)=>ys.forEach((value,y)=>{
      if(retX==-1 && value==0 )
      {
        if(choosedIndex++ != choosed)
        {
          return;
        }
        this.eventLog( "x:" + x);
        this.eventLog( "y:" + y);
        this.eventLog( "choosedIndex:" + choosedIndex);
        retX = x;
        retY = y;
      }
    }));
    if(retX==-1 || retY==-1)
    {
      this.eventLog( "ERROR , não encontrou uma jogada válida","ERROR");
    }
    this.eventLog( "count:" + count);
    this.eventLog( "choosed:" + choosed);
    this.eventLog( "choosedIndex:" + choosedIndex);
    return [retX,retY];
  }


  validatePlay(playX: number, playY: number):boolean {
    if(playX<0||playX>8||playY<0||playY>8)
    {
      return false;
    }
    if(this.game.data[playX][playY]!=0)
    {
      return false;
    }
    return true;
  }



  eventLog( text:string,level:string="TRACE")
  {
    const detail = {
      detail:{level, text}
    };
    const event:CustomEvent = new CustomEvent("JogoDaVelhaAILog",detail);
    window.document.dispatchEvent(event);

    const eventLevel:CustomEvent = new CustomEvent("JogoDaVelhaAILog"+level,detail);
    window.document.dispatchEvent(eventLevel);
  }

  switchPlayers(array:Array<number>)
  {
    return array.map((item)=>{
      if(item==0)
      {
        return item;
      }
      if(item==-1)
      {
        return 1;
      }
      return -1;
    })
  }
  prepareDataWhereAIIsPlayerOne( ): Array< Array< number>> {
    let copyData = this.game.data.map((array) => array.slice() ).slice();
    const playerOneIsTheActivePlayer = this.game.activePlayer==1;
    if(this.game.activePlayer==1)
    {
      return  copyData ;
    }
    copyData=copyData.map(this.switchPlayers);
    return  copyData;
  }

  predict()
  {

    return {
      with:async (tensor:any)=>{
        return  (await (this.model as any).predict(tensor).dataSync()) ;
      }
    }
  }

  async save(name:string)
  {
     const ioHandler = createHandler(name,"modelo");
     this.eventLog( "Salvando modelo em " + name,"INFO");
      return this.model.save( ioHandler as any  );
  }



  async train(times:number,epochs:number){

    if(this.isTraining)
    {
      return ;
    }

    this.eventLog( "=====INICIANDO TREINAMENTO======","INFO");
    this.eventLog( "times:"+times,"INFO");
    this.eventLog( "epochs:"+epochs,"INFO");
    this.eventLog( "================================","INFO");

    const victoryMoves:Array<Move>=[]
    this.isTraining = true;

    for(let trainCount=0;trainCount<times;trainCount++){
      this.eventLog( "Jogo " + (trainCount+1),"INFO");

      this.startGame();

      this.game.newGame();
      const enemy:JogoDaVelhaAI = new JogoDaVelhaAI(this.game,this.model);
      let move:number = 0;

      while(this.game.state==STATE_PLAYING)
      {

        await this.play();
        if(this.game.state!=STATE_PLAYING)
        {
          break;
        }
        await enemy.play()
      }
      if(this.game.playerWin==0)
      {
        continue;
      }
      const winner:JogoDaVelhaAI=(this.game.playerWin==-1)?this:enemy;
      victoryMoves.push(...winner.moves);

    }


    this.eventLog( "Preparando dados de treino...","INFO");

    let xArr:number[][] = [];
    const yArr:number[][] =[];

    victoryMoves.forEach(
      (move,index)=>{

        xArr = this.getTrainData(xArr,index,move.data.flat());
        yArr[index]=[move.x,move.y];

      }
    );

    let  x =  tf.tensor2d(xArr);
    const y =  tf.tensor2d(yArr);
    this.eventLog( "Iniciando treino...","INFO");
    const output = await this.model.fit(x, y, {batchSize:xArr.length, epochs:epochs});
    this.eventLog( JSON.stringify(output),"INFO");
    const startLoss:number = (output.history as any).loss[0] as number;
    const lastLoss:number = (output.history as any).loss[epochs-1] as number;
    this.eventLog( "Start loss:" + startLoss,"INFO");
    this.eventLog( "Last loss:" + lastLoss,"INFO");
    this.isTraining = false;
    this.eventLog( "Treino finalizado!","INFO");

  }
}
