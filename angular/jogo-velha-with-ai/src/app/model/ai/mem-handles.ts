

export function createHandler(name:string,path:string)
{

    return { save : (x:any)=>{
       console.log("Salvo",x);
    },
    load: ()=>{
        const data = JSON.parse(  `{"modelTopology":{"class_name":"Sequential","config":{"name":"sequential_2","layers":[{"class_name":"Dense","config":{"units":1,"activation":"linear","use_bias":true,"kernel_initializer":{"class_name":"VarianceScaling","config":{"scale":1,"mode":"fan_avg","distribution":"normal","seed":null}},"bias_initializer":{"class_name":"Zeros","config":{}},"kernel_regularizer":null,"bias_regularizer":null,"activity_regularizer":null,"kernel_constraint":null,"bias_constraint":null,"name":"dense_Dense2","trainable":true,"batch_input_shape":[null,1],"dtype":"float32"}}]},"keras_version":"tfjs-layers 4.2.0","backend":"tensor_flow.js"},"format":"layers-model","generatedBy":"TensorFlow.js tfjs-layers v4.2.0","convertedBy":null,"weightData":{},"weightSpecs":[{"name":"dense_Dense2/kernel","shape":[1,1],"dtype":"float32"},{"name":"dense_Dense2/bias","shape":[1],"dtype":"float32"}]}`);
        const array = JSON.parse(  "[0,0,64,64,254,255,127,191]");

        let arrayBuffer = new Uint8Array(array).buffer;
        data.weightData = arrayBuffer;
        return data;

    },
    exist: ()=>{
       return true ;
    }};
    };
