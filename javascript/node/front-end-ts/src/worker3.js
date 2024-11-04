
//declare function postMessage(msg:string):any;

export var object = {
    onmessage = (e)=>{console.log("Mensagem recebida 2:" , e);
        
    
        postMessage("mensagem do worker 21.");

        setInterval(()=>{
            
            postMessage("mensagem do worker 22.");
        },5000);
        
    
    }

   

}