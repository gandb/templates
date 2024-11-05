
export class Environment {
  endpoint:string = "";
  contEnv:number =0;
  private static _instance:Environment=new Environment();
  private constructor(){
    this.endpoint = "http://localhost:4200";
    this.contEnv=1;
    console.log("Iniciando Contas 3.0");
    console.log("criando  " + this.contEnv++);
  }

  public static get instance():Environment{
    console.log("criando  " + this._instance.contEnv++);
    return Environment._instance;
  }
}
