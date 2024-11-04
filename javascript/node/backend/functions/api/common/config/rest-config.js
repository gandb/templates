"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local_pool_rest_1 = require("./local-pool-rest");
const production_pool_rest_1 = require("./production-pool-rest");
let restPoolTemp = new production_pool_rest_1.ProductionPool();
if (process.env.TAULUKKO_SERVER === "LOCALHOST") {
    restPoolTemp = new local_pool_rest_1.LocalPool();
}
exports.restPool = restPoolTemp;
//# sourceMappingURL=rest-config.js.map