import {greeter} from "./src/start.mjs";


greeter.SayHello({ name: 'world' }, (err, response) => {
    if(err)
    {
        console.error("Error on service1:",err);
        return
    }
    console.log('Greeting:', response); 
});
 