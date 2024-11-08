"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
//eg: http://localhost/v1/pingpong/Isto%20%C3%A9%20um%20exemplo
app.get("/:queryParameter", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log("chegou no servidor");
        res.send({ output: req.params.queryParameter });
    }
    catch (error) {
        res.send("Error in help/");
        console.error("Error in help/", error);
    }
}));
exports.pingpong = app;
//# sourceMappingURL=index.js.map