 
 
import { factoryData }   from "../../commons/database/factory";
import { Pool } from "../../commons/database/pool.js"; 
import { SingleColumnHander } from "../../commons/database/handlers/singleColumnHandler.js";  
import { Email } from "../../commons/email.js";
import { KeyTool } from "taulukko-commons";  
import { Name } from "./name.js";
import { Description } from "./description.js";
import { Hostname } from "./host-name.js";
import { awaitFor } from "../../commons/async-utils";
   

const keyTool:KeyTool = new KeyTool();
const TIMEOUT = 30000;

export interface ContactDAO{
    insert(name: Name, email: Email, description: Description,hostname:Hostname):Promise<any>;
}
let ready:boolean  = false; 
let _pool:Pool ;

factoryData.getPool().then((pool)=>{
    _pool=pool;
    ready = true;
    console.log("Pool esta pronto");
}).catch((e)=>console.error);

class ContactDAOMariaDB implements ContactDAO{
    
    public  constructor(){

       
    }

    private async ready():Promise<boolean>{
       
        return ready;
    }

 

    public async insert(name: Name, email: Email, description: Description,hostname:Hostname): Promise<string> {
        return new Promise<string>( async (resolve,reject)=>{

            const SLEEP:number = 500;
            let time:number = 0;

            let handler = setInterval(async ()=>{
                if(!this.ready())
                {
                    console.log("waiting...");
                
                    if(time > TIMEOUT){
                        clearInterval(handler);
                        reject(new Error("Timeout waiting open connection, after " + TIMEOUT + "ms"))
                    }
                    time = time + SLEEP;
                    return;
                }
                const id:string =  keyTool.build(1,process.pid);
                const sql = "INSERT INTO contacts (id,name,email,description,domain) VALUES (?,?,?,?,?)";
                const params:Array<any> = [id,name.name() ,email.email() ,description.description(), hostname.hostname()];
                console.log("sql=",sql);
                
                await _pool.execute(sql,params);

                clearInterval(handler);

                resolve( id);

            },SLEEP);
        });

    }
}

export const contactDAO = new ContactDAOMariaDB();