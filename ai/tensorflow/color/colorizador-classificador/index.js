//const tf = require('./node_modules/@tensorflow/tfjs');
import * as tf from '@tensorflow/tfjs'; 
import {createFSHandler} from './tf-handles.js'

//https://www.tensorflow.org/js/guide/layers_for_keras_users
 

async function  print(x,y,times, method)
{ 
    //console.log(method + ":" + x + " with ", times, " = [", Math.round(y[0]), Math.round(y[1]),"] "    );
    console.log(method + ":" + x + " with ", times, " = [", (y[0]), (y[1]),"] "    );
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
 

async function run(){  
    runForXTimes(1000);  
    runForXTimes(2500);  
}
run(); 