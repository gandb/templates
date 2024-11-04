"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = void 0;
const express = require("express");
const help_1 = require("./functions/api/help");
const pingpong_1 = require("./functions/api/pingpong");
const users_1 = require("./functions/api/users");
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
app.use(`/${API_VERSION}/help`, help_1.help);
app.use(`/${API_VERSION}/pingpong`, pingpong_1.pingpong);
app.use(`/${API_VERSION}/users`, users_1.users);
exports.all = app;
//# sourceMappingURL=index.js.map