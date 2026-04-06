import { Pool, Handler } from "../pool.js";
import * as mariadb from "mariadb";


function cleanEnvValue(value:any,defaultValue:string) {
    if (!value && defaultValue) return defaultValue;

    return value.toString().replace(/^['"]|['"]$/g, '');
}


const CHURCH_DB_HOST: string = cleanEnvValue(process.env.CHURCH_DB_HOST,"localhost")  ;
const CHURCH_DB_PORT: number = parseInt(cleanEnvValue(process.env.CHURCH_DB_PORT, "3306"), 10);
const CHURCH_DB_USER: string = cleanEnvValue(process.env.CHURCH_DB_USER, "church");
const CHURCH_DB_PASSWORD: string = cleanEnvValue(process.env.CHURCH_DB_PASSWORD , "PWS");
const CHURCH_DB_NAME:string = cleanEnvValue(process.env.CHURCH_DB_NAME,"church");

const DEBUG_DB_CONNECTIONS: boolean = false;

export class MariaDBPool implements Pool {
    public pool: mariadb.Pool;

    public constructor() {
        const config: mariadb.PoolConfig = {
            host: CHURCH_DB_HOST,
            port: CHURCH_DB_PORT,
            user: CHURCH_DB_USER,
            password: CHURCH_DB_PASSWORD,
            database: CHURCH_DB_NAME,
            connectionLimit: 5,
            connectTimeout:1000,
            trace: true,
          };

        if (DEBUG_DB_CONNECTIONS) {
            console.log("Creating MariaDB pool with config:", config);
        }          
      
        this.pool = mariadb.createPool(config);
          this.pool.on("connection", (conn: mariadb.Connection) => {
            console.log("nova conexao realizada com sucesso");
          });

    }
  public async _end(): Promise<void> {
    try {
      await this.pool.end();
      console.log("Pool has been closed.");
    } catch (err) {
      console.error("Error closing the pool:", err);
    }
  }

    public async execute(sql: string, args: any[]): Promise<void> {
      const ret =   this.pool.execute(sql, args);
      return ret;
    }

    public async query<T>(sql: string, args?: any[], handler?: Handler<T>): Promise<Array<any>|any|T> {
  
        if (handler) { 
          try{
             const retNonHandled:any =  await this.pool.query(sql, args); 
             const ret:any = await handler.convert( retNonHandled); 
             return ret;
            }catch(err){ 
              console.error("Error converting the result:", err);
              return null;
            }
        } 
        return await this.pool.query(sql, args);
    }
 
}
