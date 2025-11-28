import * as tf from '@tensorflow/tfjs';
//https://www.tensorflow.org/js/guide/layers_for_keras_users

async function runForXTimes(times){
    const model=tf.sequential();
 
    model.add(tf.layers.dense({units: 1,  inputShape:[1],activation: 'linear'}));

    model.compile({
        loss:'meanSquaredError',
        optimizer: 'sgd'//,
        //metrics: ['mse']
    });

    const arrayX = [];
    const arrayY = [];

    const minO = 1;
    const maxO= times*3-1;
    const minI = 1;
    const maxI= times;

    const divideO = maxO-minO;
    const divideI = maxI-minI;

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
        arrayX[arrIndex]=index/divideI;
        arrayY[arrIndex]= ( index*3-1) - minO/ divideO;//y=3x-1
        arrIndex ++;
    }

    let xs = tf.tensor(arrayX);
    let ys = tf.tensor(arrayY); 

    const a = await model.fit(xs, ys, {epochs:1000});
   // console.log(a);
   
   const w1 = model.layers[0].getWeights()[0];
   const w2 = model.layers[0].getWeights()[1];
   print(100,parseInt(model.predict(tf.tensor1d([100/divideI])).dataSync()),times,"normal",w1,w2);
   print(1111,parseInt(model.predict(tf.tensor1d([1111/divideI])).dataSync()),times,"normal",w1,w2);
   print(1000001,parseInt(model.predict(tf.tensor1d([1000001/divideI])).dataSync()),times,"normal",w1,w2);
   print(10,parseInt(model.predict(tf.tensor1d([10/divideI])).dataSync()),times,"normal",w1,w2); 
} 

async function  print(x,y,times, method,w1,w2)
{ 
    console.log(method + ":" + x + " with ", times, " = ", y,"::pesos " + await w1.data() + " / " + await w2.data(2));
}
 

async function runForXTimesAdam(times){
    const model=tf.sequential();
 
    model.add(tf.layers.dense({units: 1,  inputShape:[1]}));

    const opt = tf.train.adam(0.001);

    model.compile({
        loss:'meanSquaredError',
        optimizer: opt//'sgd',
        //metrics: ['mse']
    });

    const arrayX = [];
    const arrayY = [];
 

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
   // console.log(a);
   const w1 = model.layers[0].getWeights()[0];
   const w2 = model.layers[0].getWeights()[1];
   print(100,parseInt(model.predict(tf.tensor1d([100]),'float32').dataSync()),times,"adam",w1,w2);
   print(1111,parseInt(model.predict(tf.tensor1d([1111]),'float32').dataSync()),times,"adam",w1,w2);
   print(1000001,parseInt(model.predict(tf.tensor1d([1000001]),'float32').dataSync()),times,"adam",w1,w2);
   print(10,parseInt(model.predict(tf.tensor1d([10]),'float32').dataSync()),times,"adam",w1,w2); 
} 
 

async function run(){
    runForXTimes(10);
    runForXTimes(200); 
    runForXTimesAdam(10);
    runForXTimesAdam(8000); 
}
run();