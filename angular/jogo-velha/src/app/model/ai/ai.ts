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
    this.game = game;
    this.model.add(tf.layers.dense({units: 9, useBias: true, activation: 'relu', inputShape:[9]}));
    this.model.add(tf.layers.dense({units: 8, useBias: true, activation: 'relu'}));
    this.model.add(tf.layers.dense({units: 4, useBias: true, activation: 'relu'}));
    this.model.add(tf.layers.dense({units: 2, useBias: true}));
    this.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
  }

  startGame(){
    this.state = ONE_PLAYER_MODE;
  }

  async play(){
    if(this.game.state!=STATE_PLAYING)
    {
      throw new Error("Game is not started");
    }
    let isAvaiable:boolean=false;
    const data:Array<Array<number>> =  this.prepareData();
    while(!isAvaiable)
    {
      const ss =await this.predict(this.model).with(tf.tensor2d(data) );
      const x = this.model.predict(tf.tensor2d([[221,0,34]]),[1,3],'int32').dataSync();

    }
  }
  revertData(array:Array<number>)
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
  prepareData( ): Array<Array<number>> {
    let copyData = this.game.data.map((array) => array.slice() ).slice();
    if(this.game.activePlayer==1)
    {
      return copyData;
    }
    copyData=copyData.map(this.revertData);
    return copyData;
  }

  predict(model:any)
  {

    return {
      with:async (tensor:any)=>{
        return  parseInt((await model.predict(tensor).dataSync()).toString());
      }
    }
  }
}


async function runForXTimes(times){
  let model=tf.sequential();

  //2 bits de saída 00-nuetro, 01-red, 10-green, 11-blue
  model.add(tf.layers.dense({units: 3,  inputShape:[3]}));
  model.add(tf.layers.dense({units: 32, activation:'relu'}));
  model.add(tf.layers.dense({units: 2,  activation:'sigmoid'}));

  model.compile({
      loss:'meanSquaredError',
      optimizer:  'sgd',
      metrics: ['mse']
  });

const arrayX = [];
const arrayY = [];
const ioHandler = createFSHandler("function","modelo");


  if (false && ioHandler.exist()) {
      //carrega treino
      model = await tf.loadLayersModel(ioHandler);
  }
  else{
      //treina
      let arrIndex = 0;


      for(var index=1;index<(times+1);index++)
      {
          let red = parseInt(Math.random() * 255);
          let  green = parseInt(Math.random() * 255);
          let blue = parseInt(Math.random() * 255);
          //-1 blue, 1 red, 0 quando blue e red forem iguais
          let result =  (red> blue)?[0,1]:[1,1];

          if(green>red && green>blue)
          {
              result = [1,0];

          }
          else if(red==blue)
          {
              result = [0,0];
          }

          if(index%5==0)
          {
              //força treinar o caso raro
              red = green = blue;
              result = [0,0];
          }
          arrayX[arrIndex]=[red,green,blue];
          arrayY[arrIndex]=result;
          arrIndex ++;
      }

      const xs = tf.tensor2d(arrayX);

      const ys = tf.tensor2d(arrayY);

      const a = await model.fit(xs, ys, {epochs:1000});
  }


// console.log(a);

try{

await model.save( ioHandler    );

}catch(e)
{
  console.log("error",e);
}


await print("[221,0,34] esperado red [0,1] ", model.predict(tf.tensor2d([[221,0,34]]),[1,3],'int32').dataSync(),times,"sgd");
await print("[21,35,199] esperado blue [1,1] ", model.predict(tf.tensor2d([[21,35,199]]),[1,3],'int32').dataSync(),times,"sgd");
await print("[113,123,113]  esperado green[1,0] ", model.predict(tf.tensor2d([[113,123,113]]),[1,3],'int32').dataSync(),times,"sgd");
await print("[11,11,11] esperado neutro [0,0] ", model.predict(tf.tensor2d([[11,11,11]]),[1,3],'int32').dataSync(),times,"sgd");
await print("[222,222,222] esperado neutro [0,0] ", model.predict(tf.tensor2d([[222,222,222]]),[1,3],'int32').dataSync(),times,"sgd");

}
