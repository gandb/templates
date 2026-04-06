import { IRestPool } from "./rest-pool.js";
import { LocalPool } from "./local-pool-rest.js";
import { ProductionPool } from "./production-pool-rest.js";

let restPoolTemp: IRestPool = new ProductionPool();

if (process.env.TAULUKKO_SERVER === "LOCALHOST") {
    restPoolTemp = new LocalPool();
}

export const restPool: IRestPool = restPoolTemp;
