"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restPool = void 0;
const local_pool_rest_1 = require("./local-pool-rest");
const production_pool_rest_1 = require("./production-pool-rest");
let restPoolTemp = new production_pool_rest_1.ProductionPool();
if (process.env.TAULUKKO_SERVER === "LOCALHOST") {
    restPoolTemp = new local_pool_rest_1.LocalPool();
}
exports.restPool = restPoolTemp;
