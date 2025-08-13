
 class Environment { 
  endpoints={
    root:"http://localhost:80",
    metadata:{
      increment:"/v1/metadata/increment"
    },
    contact:{
      post:"/v1/contact"
    }
  };
  private static _instance:Environment=new Environment();
  public constructor(){ 
    console.log("Iniciando Grossi 3.0"); 
  }
 
}

export var enviroment = new Environment();