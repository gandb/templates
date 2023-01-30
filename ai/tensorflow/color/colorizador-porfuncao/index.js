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
    
        model.add(tf.layers.dense({units: 1,  inputShape:[3]}));

        const opt = tf.train.adam(0.001);

        model.compile({
            loss:'meanSquaredError',
            optimizer: opt//'sgd',
            //metrics: ['mse']
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
                const red = parseInt(Math.random() * 255);
                const green = parseInt(Math.random() * 255);
                const blue = parseInt(Math.random() * 255);
                //-1 blue, 1 red, 0 quando blue e red forem iguais
                const result = (red> blue)?  (red - blue)/255 :((-1*blue + red)/255) ;
                console.log("Treinando com RGB(",red,",",green,",",blue,")=",result);
                arrayX[arrIndex]=[red,green,blue];
                arrayY[arrIndex]=result;
                arrIndex ++;
            }
         
            const xs = tf.tensor2d(arrayX);

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
   print(221.34, model.predict(tf.tensor2d([[221,0,34]]),[1,3],'int32').dataSync(),times,"adam",w1,w2);
   print(21.199, model.predict(tf.tensor2d([[21,35,199]]),[1,3],'int32').dataSync(),times,"adam",w1,w2);
   print(113.113, model.predict(tf.tensor2d([[113,123,113]]),[1,3],'int32').dataSync(),times,"adam",w1,w2);
} 
 

async function run(){
    runForXTimes(10);
    runForXTimes(4000);  
}
run();