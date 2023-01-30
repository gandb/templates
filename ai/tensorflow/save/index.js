//const tf = require('./node_modules/@tensorflow/tfjs');
import * as tf from '@tensorflow/tfjs'; 
import {createFSHandler} from './tf-handles.js'

//https://www.tensorflow.org/js/guide/layers_for_keras_users
 

async function  print(x,y,times, method,w1,w2)
{ 
    console.log(method + ":" + x + " with ", times, " = ", y,"::pesos " + await w1.data() + " / " + await w2.data(2));
}
 

async function runForXTimes(times){
        let model=tf.sequential();
    
        model.add(tf.layers.dense({units: 1,  inputShape:[1]}));

        const opt = tf.train.adam(0.001);

        model.compile({
            loss:'meanSquaredError',
            optimizer: opt//'sgd',
            //metrics: ['mse']
        });

    const arrayX = [];
    const arrayY = [];
    const ioHandler = createFSHandler("function","modelo"); 
        

        if (ioHandler.exist()) {
            //carrega treino 
            model = await tf.loadLayersModel(ioHandler);
        } 
        else{
            //treina
            let arrIndex = 0;


            for(var index=1;index<(times+1);index++)
            {
               
                //por algum motivo que nao entendi se der mais exemplos a rede passa a dar resultados errados
                //exemplo se eu passar 20 o resultado fica mais erroneo
                //com 10 ele retorna 298 pra x = 100
                //acima disso ele retorna NaN, números negativos ou totalmente incorretos 
                if(index>95 && index < 105)
                {
                    continue;
                }
                arrayX[arrIndex]=index;
                arrayY[arrIndex]= index*3-1 ;//y=3x-1
                arrIndex ++;
            }
         
            const xs = tf.tensor1d(arrayX, 'float32');//int32 funciona
            const ys = tf.tensor1d(arrayY, 'float32'); 
        
            const a = await model.fit(xs, ys, {epochs:300});
        } 



   // console.log(a);

   try{
 
    await model.save( ioHandler    ); 
    
   }catch(e)
    {
        console.log("error",e);
    }
 


   const w1 = model.layers[0].getWeights()[0];
   const w2 = model.layers[0].getWeights()[1];
   print(100,parseInt(model.predict(tf.tensor1d([100]),'float32').dataSync()),times,"adam",w1,w2);
   print(1111,parseInt(model.predict(tf.tensor1d([1111]),'float32').dataSync()),times,"adam",w1,w2);
   print(1000001,parseInt(model.predict(tf.tensor1d([1000001]),'float32').dataSync()),times,"adam",w1,w2);
   print(10,parseInt(model.predict(tf.tensor1d([10]),'float32').dataSync()),times,"adam",w1,w2); 
} 
 

async function run(){
    runForXTimes(10);
    runForXTimes(9000);  
}
run();