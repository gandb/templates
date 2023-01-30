//const tf = require('./node_modules/@tensorflow/tfjs');
import * as tf from '@tensorflow/tfjs'; 
import {createFSHandler} from './tf-handles.js'

//https://www.tensorflow.org/js/guide/layers_for_keras_users
 

async function  print(x,y,times, method)
{ 
     console.log(method + ":" + x + " with ", times, " = [", Math.round( (y[0])) ,"] "    );
}
  
 

async function runForXTimes(times){
        let model=tf.sequential();
    
        //2 bits de saída 00-nuetro, 01-red, 10-green, 11-blue
        model.add(tf.layers.dense({units: 2,  inputShape:[2]}));
        //não pode ser linear as funções, o motivo que funciona só
        //com relu no meio eu não entendi, no fim pode ser relu também
        //mas ai precisa de mais neuronios
        model.add(tf.layers.dense({units: 4,  activation:'relu'}));
        model.add(tf.layers.dense({units: 1,  activation:'sigmoid'}));

        const opt = tf.train.adam(0.001);

        model.compile({
            loss:'meanSquaredError',
            optimizer:  'sgd',
            //metrics: ['mse']
        });

    const arrayX = [];
    const arrayY = [];
    const ioHandler = createFSHandler("function","modelo"); 
        

        if ( false && ioHandler.exist()) {
            //carrega treino 
            model = await tf.loadLayersModel(ioHandler);
        } 
        else{
            //treina
            let arrIndex = 0;

            arrayX[arrIndex]=[0,0];
            arrayY[arrIndex]=0;
            arrIndex ++;
            arrayX[arrIndex]=[0,1];
            arrayY[arrIndex]=1;
            arrIndex ++;
            arrayX[arrIndex]=[1,0];
            arrayY[arrIndex]=1;
            arrIndex ++; 
            arrayX[arrIndex]=[1,1];
            arrayY[arrIndex]=0;
            arrIndex ++; 
         
            const xs = tf.tensor2d(arrayX);

            const ys = tf.tensor(arrayY); 
        
            const a = await model.fit(xs, ys, {epochs:times});
        } 


   // console.log(a);

   try{
 
    await model.save( ioHandler    ); 
    
   }catch(e)
    {
        console.log("error",e);
    }
 
 
    await print("[0,0]", model.predict(tf.tensor2d([[0,0]]),[1,2],'int32').dataSync(),times,"adam");
    await print("[0,1]", model.predict(tf.tensor2d([[0,1]]),[1,2],'int32').dataSync(),times,"adam");
    await print("[1,0]", model.predict(tf.tensor2d([[1,0]]),[1,2],'int32').dataSync(),times,"adam");
    await print("[1,1]", model.predict(tf.tensor2d([[1,1]]),[1,2],'int32').dataSync(),times,"adam");
   
} 
 

async function run(){
    runForXTimes(10);
    runForXTimes(100);  
    runForXTimes(1000);  
    runForXTimes(10000);  
}
run(); 