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
exports.users = void 0;
const express = require("express");
const commonVol2 = require("../common/index");
const app = express();
const middlewareManager = new commonVol2.MiddlewareManager(app);
middlewareManager.intercept();
app.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({ body: req.body, headers: req.headers });
    }
    catch (error) {
        new commonVol2.ResponseError(error).sendError(res);
        console.error("Error in help/", error);
    }
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const context = req.context;
        res.send({ query: req.query, headers: req.headers, context: context.toString() });
    }
    catch (error) {
        new commonVol2.ResponseError(error).sendError(res);
        console.error("Error in help/", error);
    }
}));
exports.users = app;
//# sourceMappingURL=index.js.map