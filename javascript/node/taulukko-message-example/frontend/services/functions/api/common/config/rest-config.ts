import { IRestPool } from "./rest-pool";
import { LocalPool } from "./local-pool-rest";
import { ProductionPool } from "./production-pool-rest";

let restPoolTemp: IRestPool = new ProductionPool();

if (process.env.TAULUKKO_SERVER === "LOCALHOST") {
    restPoolTemp = new LocalPool();
}

export const restPool: IRestPool = restPoolTemp;
