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
exports.pingpong = void 0;
const express = require("express");
const taulukko_messages_1 = require("taulukko-messages");
const app = express();
let semaphore = false;
let semaphoreb = false;
console.log("criando os objetos");
let server = null;
let publisher = null;
let subscriber = null;
(() => __awaiter(void 0, void 0, void 0, function* () {
    server = taulukko_messages_1.Server.create({});
    publisher = taulukko_messages_1.Publisher.create({
        topics: ["topic.helloWorld", ""]
    });
    subscriber = taulukko_messages_1.Subscriber.create({
        topics: ["topic.helloWorld"]
    });
    console.log("abrindo os objetos");
    yield server.open();
    yield publisher.open();
    yield subscriber.open();
}))().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("objetos abertos, subscrevendo-se");
    yield subscriber.on(onReceiveBradcast);
    semaphore = true;
})).catch((e) => {
    console.error(e);
});
const onReceiveBradcast = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Hello world recebido");
        console.log(message.data);
        console.log(message.topic);
        semaphoreb = true;
    }
    catch (e) {
        console.log("error no subscriber");
        semaphoreb = true;
    }
});
//eg: http://localhost/v1/pingpong/Isto%20%C3%A9%20um%20exemplo
app.get("/:queryParameter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!semaphore) {
        console.log("ping pong without message ");
        res.send({ output: req.params.queryParameter });
        return;
    }
    const taulukkoAPITest = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("taulukkoAPITest");
        console.log("Enviando hello world");
        yield publisher.send("Hello World");
        let count = 0;
        semaphoreb = false;
        const handle = setInterval(() => {
            if (semaphoreb) {
                clearInterval(handle);
                semaphoreb = false;
                resolve();
            }
            if (count++ > 30) {
                clearInterval(handle);
                semaphoreb = false;
                reject();
            }
        }, 1000);
    }));
    console.log("ping pong");
    yield taulukkoAPITest.then(() => {
        res.send({ output: req.params.queryParameter });
    }).catch((e) => {
        res.send("Error in help/");
        console.error("Error in help/", e);
    });
}));
exports.pingpong = app;
