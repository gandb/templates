"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const pingpong_1 = require("./functions/api/pingpong");
const bodyParser = require("body-parser");
// const PORT: number = Number(process.env.PORT) || 80;
const PORT = 80;
const app = express();
const API_VERSION = "v1";
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
app.use(corsConfig);
bodyPartConfig();
//funcoes
function corsConfig(req, res, next) {
    console.log("Configure cors :");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
}
function bodyPartConfig() {
    app.use(bodyParser.json({ limit: "1mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
}
// ROUTES 
app.use(`/${API_VERSION}/pingpong`, pingpong_1.pingpong);
exports.all = app;
//# sourceMappingURL=index.js.map