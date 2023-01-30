//const tf = require('./node_modules/@tensorflow/tfjs');
import * as tf from '@tensorflow/tfjs';  

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

 

    let arrayX = [];
    let arrayY = []; 
        

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
    
    let xs = tf.tensor1d(arrayX, 'int32');//int32 funciona
    let ys = tf.tensor1d(arrayY, 'int32'); 

    let a = await model.fit(xs, ys, {epochs:300});
            
    
    let w1 = model.layers[0].getWeights()[0];
    let w2 = model.layers[0].getWeights()[1];
    print(100,parseInt(model.predict(tf.tensor1d([100]),'int32').dataSync()),times,"adam",w1,w2);
    print(1111,parseInt(model.predict(tf.tensor1d([1111]),'int32').dataSync()),times,"adam",w1,w2);
    print(1000001,parseInt(model.predict(tf.tensor1d([1000001]),'int32').dataSync()),times,"adam",w1,w2);
    print(10,parseInt(model.predict(tf.tensor1d([10]),'int32').dataSync()),times,"adam",w1,w2);

    arrayX = [];
    arrayY = []; 
    

    //treina
      arrIndex = 0;

    
    for(var index=times+1;index<(times*2);index+=32)
    {
        for(var indexb=index; indexb<(index+32);indexb++)
        {
            arrayX[arrIndex]=indexb;
            arrayY[arrIndex]= indexb*3-1 ;//y=3x-1
            arrIndex ++;
        }
       

        xs = tf.tensor1d(arrayX, 'int32');//int32 funciona
        ys = tf.tensor1d(arrayY, 'int32'); 
    
        a = await model.fit(xs, ys, {epochs:300});
    }

  
    w1 = model.layers[0].getWeights()[0];
    w2 = model.layers[0].getWeights()[1];
   
    print(100,parseInt(model.predict(tf.tensor1d([100]),'int32').dataSync()),times*2,"adam",w1,w2);
    print(1111,parseInt(model.predict(tf.tensor1d([1111]),'int32').dataSync()),times*2,"adam",w1,w2);
    print(1000001,parseInt(model.predict(tf.tensor1d([1000001]),'int32').dataSync()),times*2,"adam",w1,w2);
    print(10,parseInt(model.predict(tf.tensor1d([10]),'flint32oat32').dataSync()),times*2,"adam",w1,w2);


} 
 

async function run(){ 
    runForXTimes(1250);  
}
run();
 