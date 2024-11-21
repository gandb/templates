 
import { Request, Response, Application } from "express";
import * as express from "express";  
import {Server,Publisher,Subscriber,Message} from "taulukko-messages"; 

const app: Application = express();
 
let semaphore =false; 
let semaphoreb =false; 


console.log("criando os objetos");     
let server:Server =  null;
let publisher:Publisher =null;
let subscriber:Subscriber = null;
 (
    async ():Promise<void>=>{

    server = Server.create({  
        });
   publisher = Publisher.create({ 
        topics:["topic.helloWorld",""] 
        });
        subscriber= Subscriber.create({ 
        topics:["topic.helloWorld"] 
        });

        
    console.log("abrindo os objetos");
    await server.open();
    await publisher.open();
    await subscriber.open(); 
      
  
}
 )().then(async ()=>{
    console.log("objetos abertos, subscrevendo-se");
    
    await subscriber.on(onReceiveBradcast);
    semaphore=true;

 }).catch((e)=>{
    console.error(e);
 });

const onReceiveBradcast = async (message:Message)=>{
      
    try{
        console.log("Hello world recebido");
        console.log(message.data);
        console.log(message.topic); 
        semaphoreb=true;
    }
    catch(e)
    { 
        console.log("error no subscriber"); 
        semaphoreb=true;
    }
  };


//eg: http://localhost/v1/pingpong/Isto%20%C3%A9%20um%20exemplo
app.get("/:queryParameter", async (req: Request, res: Response) => {

    if(!semaphore)
        {
            console.log("ping pong without message ");
            res.send({ output : req.params.queryParameter });
            return;
        }
    const taulukkoAPITest =new Promise( async  (resolve:any,reject:any):Promise<void>=>{

        console.log("taulukkoAPITest"); 

            console.log("Enviando hello world");

            await publisher.send("Hello World"); 
        
            let count=0;
            semaphoreb=false;
            const handle = setInterval(()=>{
                if(semaphoreb)
                {
                    clearInterval(handle); 
                    semaphoreb=false;
                    resolve(); 
                }
                if(count++>30)
                {
                    clearInterval(handle); 
                    semaphoreb=false;
                    reject();
                }
            },1000);
            
    });
    console.log("ping pong");
  
   
    await taulukkoAPITest.then(()=>{
         
        res.send({ output : req.params.queryParameter });
    }).catch((e)=>{
        res.send("Error in help/");
    
        console.error("Error in help/", e);
    })
    
    
 
});
 

export const pingpong = app;
