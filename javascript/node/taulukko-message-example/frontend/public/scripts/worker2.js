onmessage = (e)=>{
    console.log("Mensagem recebida :" , e);
    setTimeout(()=>{
        postMessage("mensagem do worker.");
    },5000);
    
  
}