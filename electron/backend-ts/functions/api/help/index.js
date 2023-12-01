"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const express = require("express");
const commonVol2 = require("../common/index");
const rest_config_1 = require("../common/config/rest-config");
const app = express();
const middlewareManager = new commonVol2.MiddlewareManager(app);
middlewareManager.intercept();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const help = {
            self: rest_config_1.restPool.help,
            help: rest_config_1.restPool.help,
            campaigns: rest_config_1.restPool.campaign,
            profile: rest_config_1.restPool.profile,
            signin: rest_config_1.restPool.signin,
            frontend: rest_config_1.restPool.frontend,
            backend: rest_config_1.restPool.backend,
            faceClientID: rest_config_1.restPool.faceClientID,
        };
        res.send({ help });
    }
    catch (error) {
        new commonVol2.ResponseError(error).sendError(res);
        console.error("Error in help/", error);
    }
}));
app.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accesDenied = commonVol2.errorCodes.CODE_ACCESS_DENIED / 100;
    const code = commonVol2.errorCodes.CODE_ACCESS_DENIED + 1;
    res.status(Math.round(accesDenied)).send({ code });
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accesDenied = commonVol2.errorCodes.CODE_ACCESS_DENIED / 100;
    const code = commonVol2.errorCodes.CODE_ACCESS_DENIED + 1;
    res.status(Math.round(accesDenied)).send({ code });
}));
app.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accesDenied = commonVol2.errorCodes.CODE_ACCESS_DENIED / 100;
    const code = commonVol2.errorCodes.CODE_ACCESS_DENIED + 1;
    res.status(Math.round(accesDenied)).send({ code });
}));
exports.help = app;
//# sourceMappingURL=index.js.map