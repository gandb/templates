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

  constructor(game:JogoVelha,model:tf.Sequential =  tf.sequential()){
    /**
     * Modelagem de entrada da rede neural:
     * Entrada : 3x3 (tratado, o computador sempre é o jogador 1 e é o próximo a jogar)
     * Camadas Ocultas de 8,4 e 2 bytes
     * Saída : X,Y
     */
    this.eventLog("Iniciando IA");
    this.game = game;
    this.model = model;
    const isNewModel:boolean = model.layers.length==0;
    if(! isNewModel)
    {
      return;
    }
    this.eventLog("Criando modelo...");
    this.eventLog("Adicionando camadas...");
    this.model.add(tf.layers.dense({units: 9, useBias: true, activation: 'relu',inputShape:[9]}));
    this.eventLog("Camada de Entrada adicionada...");
    this.model.add(tf.layers.dense({units: 8, useBias: true, activation: 'relu'}));
    this.model.add(tf.layers.dense({units: 4, useBias: true, activation: 'relu'}));
    this.eventLog("Camadas intermediarias adicionadas...");
    this.model.add(tf.layers.dense({units: 2, useBias: true}));
    this.eventLog("Camada de Saída adicionada...");
    this.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    this.eventLog("Modelo compilado...");

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
    this.eventLog( "Jogada iniciada");
    if(this.game.state!=STATE_PLAYING)
    {
      throw new Error("Game is not started");
    }
    let isAvaiable:boolean=false;
    this.eventLog( "Preparando dados:");
    const data2D:number[][] =  this.prepareDataWhereAIIsPlayerOne();
    const data:number[] = data2D.flat();
    this.eventLog( "Dados preparados...");
    while(!isAvaiable)
    {



      this.eventLog( "Iniciando predição...");

      const input = data.flat();

      //Note que o tensorf é 2d, porque o predict aceita um array de entradas pra gerar as saidas, entao pra um predict é sempre um array de [1,entrada]
      const sugest =await this.predict().with(tf.tensor2d([input]) );
      this.eventLog( "Sugestão dada :"+ JSON.stringify( sugest) + " para " + JSON.stringify(this.game.data));
      isAvaiable=true;

      let playX:number = Math.round(sugest[0]);
      let playY:number = Math.round(sugest[1]);

      if(!this.validatePlay(playX,playY))
      {
        this.eventLog( "Sugestão dada (" + playX + "," + playY + ") é incorreta.");
        let randomPlay:number[] = this.findRandomPlay();
        playX = Math.round(randomPlay[0]);
        playY = Math.round(randomPlay[1]);
        this.eventLog( "Sugestão aleatória selecionada  (" + playX + "," + playY + ").");
      }
      this.eventLog( "Computador joga em (" + playX + "," + playY + ").");
      const move:Move = new Move(data2D,playX,playY);
      this.moves.push(move);
      this.game.play(playX,playY);
      //Proximos passos
      /*
        1-) Done - Adaptar a saída pro mundo real
        2-) Done -Corrigir bug de permitir o humano jogar enquanto é a vez do computador
        3-) Done -Alterar legenda de quem ganhou quando é humano vs computador pra dizer humano ou computador
        4-) Done -Guardar a jogada do jogador
        5-) Done -Enviar pro objeto do jogo a jogada
        6-) Done - Configurar o treino pra treinar o computador contra o computador
        7-) Corrigir bug das coordenadas trocadas
        8-) Injetar o treino no modelo
        9-) Arrumar o load e save

      */
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


  async train(times:number,epochs:number){


    this.eventLog( "=====INICIANDO TREINAMENTO======","INFO");
    this.eventLog( "times:"+times);
    this.eventLog( "epochs:"+epochs);
    this.eventLog( "================================","INFO");


    this.isTraining = true;

    this.startGame();

    this.game.newGame();
    const enemy:JogoDaVelhaAI = new JogoDaVelhaAI(this.game,this.model);
    let move:number = 0;

    while(this.game.state==STATE_PLAYING)
    {
      if(move>9)
      {
        throw new Error("Ilegal lenght of moves");
      }
      console.log("Movimento " + (++move));
      console.log("Data:" ,this.game.data);
      console.log("State:" ,this.game.playerWin);
      await this.play();
      if(this.game.state!=STATE_PLAYING)
      {
        break;
      }
      await enemy.play()
    }
    const winner:JogoDaVelhaAI=(this.game.playerWin==-1)?this:enemy;
    console.log("winner.moves",winner.moves);
    //const x = tf.tensor2d(arrayX);

    //const y = tf.tensor2d(arrayY);

    //const a = await model.fit(xs, ys, {epochs});
    /**
        this.eventLog( "Iniciando construção de X");

      let xArr:number[][] = [];
      xArr = this.getTrainData(xArr,0,data);
      let  x =  tf.tensor2d(xArr);
      this.eventLog( "Iniciando construção de Y");

      const yArr:number[][] = [[0,1]];
      const y =  tf.tensor2d(yArr);

      this.eventLog( "Iniciando treino...");
      const a = await this.model.fit(x, y, {batchSize:1, epochs:1000});
      //this.eventLog(JSON.stringify(a));
      //console.log(a);
     */
  }
}
