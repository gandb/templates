 

import {  Publisher,Subscriber} from "taulukko-messages-client";
import type {Listener} from "taulukko-messages-client";
 


let listenerValue:Listener|undefined;
let simpleListenerValue:SimpleListener|undefined;

export function listener(listener:Listener):void{
    listenerValue = listener;
};

export function simpleListener(simpleListener:SimpleListener):void{
    simpleListenerValue = simpleListener;
};


const publisher = Publisher.create({topics:["echo"]});

const subscriber:Subscriber = Subscriber.create({topics:["echo"]});
(async ()=>{
 
    await publisher.open();
     
    await subscriber.open();
 
    if(listenerValue)
    {
        await subscriber.on(listenerValue as Listener);
    }
})();


  
export function byLib(value:string){
    if(simpleListenerValue)
    {
        simpleListenerValue("Echo by lib : " + value);
    }
}   

export async function bySocketIO(value:string){ 
     publisher.send(value );
    
}

interface SimpleListener{
    (data:string):void;
}