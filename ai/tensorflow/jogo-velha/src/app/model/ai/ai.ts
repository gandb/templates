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
  private model:tf.Sequential =  tf.sequential();
  private game:JogoVelha;
  private moves1:Array<Move>=new Array();
  private moves2:Array<Move>=new Array();
  private state:number=IDLE;

  constructor(game:JogoVelha){
    /**
     * Modelagem de entrada da rede neural:
     * Entrada : 3x3 (tratado, o computador sempre é o jogador 1 e é o próximo a jogar)
     * Camadas Ocultas de 8,4 e 2 bytes
     * Saída : X,Y
     */
    this.eventLog("Iniciando IA");
    this.game = game;
    this.eventLog("Adicionando camadas...");
    //this.model.add(tf.layers.dense({units: 9, inputShape:[2]}));
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
    this.state = ONE_PLAYER_MODE;
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
    const data:number[] =  this.prepareDataWhereAIIsPlayerOne();
    this.eventLog( "Dados preparados...");
    while(!isAvaiable)
    {
      this.eventLog( "Treino temporario...");

      this.eventLog( "Iniciando construção de X");

      let xArr:number[][] = [];
      xArr = this.getTrainData(xArr,0,data);
      console.log("XArr",xArr);
      let  x =  tf.tensor2d(xArr);
      this.eventLog( "Iniciando construção de Y");

      const yArr:number[][] = [[0,1]];
      const y =  tf.tensor2d(yArr);

      this.eventLog( "Iniciando treino...");
      const a = await this.model.fit(x, y, {batchSize:1, epochs:1000});
      //this.eventLog(JSON.stringify(a));
      //console.log(a);

      this.eventLog( "Iniciando predição...");

      const input = data.flat();

      //Note que o tensorf é 2d, porque o predict aceita um array de entradas pra gerar as saidas, entao pra um predict é sempre um array de [1,entrada]
      const sugest =await this.predict().with(tf.tensor2d([input]) );
      this.eventLog( "Sugestão dada :"+ JSON.stringify( sugest) + " para " + JSON.stringify(this.game.data));
      isAvaiable=true;
      console.log("sugest",sugest);

      //Proximos passos
      /*
        1-) Adaptar a saída pro mundo real (arredondando, e no caso de uma jogada invalida, retornar um lugar desocupado aleatorio)
        2-) Guardar a jogada do jogador
        3-) Enviar pro objeto do jogo a jogada
        4-) Configurar o treino pra treinar o computador contra o computador
        5-) Arrumar o load e save

      */
    }
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
  prepareDataWhereAIIsPlayerOne( ): Array< number> {
    let copyData = this.game.data.map((array) => array.slice() ).slice();
    const playerOneIsTheActivePlayer = this.game.activePlayer==1;
    if(this.game.activePlayer==1)
    {
      return  copyData.flat();
    }
    copyData=copyData.map(this.switchPlayers);
    return  copyData.flat();
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
    this.game.newGame();

    //const x = tf.tensor2d(arrayX);

    //const y = tf.tensor2d(arrayY);

    //const a = await model.fit(xs, ys, {epochs});
  }
}

