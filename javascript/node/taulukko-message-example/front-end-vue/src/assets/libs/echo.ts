import {  Publisher,Subscriber} from "taulukko-messages-client";
import type {Listener,Message  } from "taulukko-messages-client";


const publisher = Publisher.create({topics:["echo"]});

const subscriber:Subscriber = Subscriber.create({topics:["echo"]});
(async ()=>{

    console.log("abrindo publisher");
    await publisher.open();

    
    console.log("abrindo subscriber");
    await subscriber.open();

    
    console.log("ouvlindo o publisher");
    const listener: Listener = async (message:Message):Promise<any>=>{
        console.log("mensagem do servidor:",message);
        return "ok";
    } ;
    
    
    await subscriber.on(listener);
})();


  
export function byLib(value:string){
    console.log("Echo by lib : " + value);
}

export function bySocketIO(value:string){ 
    publisher.send(value ); 
}