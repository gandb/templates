"user strict";

import {Pool} from "./pool.js";
import {MariaDBPool} from "./mariadb/marida-db-pool.js";

let me:FactoryData;

class FactoryData {

    private closed = false;

    private constructor(private pool: Pool) {
        console.log("Creating FactoryData instance with MariaDBPool");
    }

    public static getInstance(): FactoryData {
        if (!me)
        {
            me = new FactoryData(new MariaDBPool());
        }
        return me;
    }

    public async getPool(): Promise<Pool> {
        return this.pool;
    }
    
    public async restart(): Promise<boolean> {
        await this.close();
        await this.reOpen();
        return true;
    }

    public async reOpen(): Promise<boolean> {
        if(!this.closed){
            throw new Error("Pool is already opened");
        }
        this.pool =new MariaDBPool();
        return true;
    }

    public async isOpen(){
        return !this.closed;
    }

    public async close(): Promise<boolean> {
        if(this.closed){
            throw new Error("Pool is already closed");
        }
        this.pool._end();
        this.closed =true;
        return true;
    }

}
const  factoryData = FactoryData.getInstance();
 
export { factoryData };
