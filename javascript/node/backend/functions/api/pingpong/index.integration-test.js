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
const axios_1 = require("axios");
const PORT = Number(process.env.PORT) || 8080;
const client = axios_1.default.create();
const wrongclient = axios_1.default.create();
const TAULUKKO_EMAIL_TEST = "minsc2019@gmail.com";
const TAULUKKO_APP_TOKEN = "000001-1lUw3sStt_JelyzdwrgR20zOycQ5IjcwBFZqQXUWRI";
const SERVICE_URL_ACCOUNT = `http://localhost:${PORT}/profile/`;
const SERVICE_URL_LOGIN = `http://localhost:${PORT}/signin/internal-login`;
const SERVICE_URL = `http://localhost:${PORT}/campaign`;
const beforeAll = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 20; i++) {
        console.info("");
    }
    let parameters = { tokenApp: TAULUKKO_APP_TOKEN, tokenUser: undefined };
    wrongclient.interceptors.request.use((config) => {
        if (!config.data) {
            config.data = parameters;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    const callback = yield wrongclient.post(SERVICE_URL_LOGIN, { email: TAULUKKO_EMAIL_TEST });
    parameters = { tokenUser: callback.data.token, tokenApp: TAULUKKO_APP_TOKEN };
    client.interceptors.request.use((config) => {
        if (!config.data) {
            config.data = parameters;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
});
const printStartTest = (name) => {
    console.info(`==================================================================`);
    console.info(`==================================================================`);
    console.info(`======Iniciando testes para : ${name}===`);
    console.info(`==================================================================`);
    console.info(`==================================================================`);
};
const testCampaignAdd = () => __awaiter(void 0, void 0, void 0, function* () {
    printStartTest(`testCampaignAdd em ${SERVICE_URL_ACCOUNT}`);
    const argsWrong = { name: "wrong", description: "wrong" };
    const argsBase = {
        name: "Campaign 1",
        description: "Description 1",
    };
    console.info(`===Iniciando testes para : testCampaignAdd em ${SERVICE_URL}===`);
    console.info("Teste utilizando API KEY e API IDs corretos :");
    try {
        const callback = yield client.put(SERVICE_URL, argsBase);
        console.info("Success!!!=>", callback.data);
    }
    catch (error) {
        console.info("Faill!!!=>", error.message);
    }
    console.info("Teste utilizando API KEY e API IDs errados :");
    try {
        const callback = yield wrongclient.put(SERVICE_URL, argsWrong);
        console.info("Faill!!!=>", callback);
    }
    catch (error) {
        console.info("Success!!!=>", error.message);
    }
});
const testLoadCampaignByID = () => __awaiter(void 0, void 0, void 0, function* () {
    let callback = yield client.post(SERVICE_URL_ACCOUNT);
    const cmpLink = callback.data.allcampaigns.contents[0];
    console.info(`===Iniciando testes para :testLoadCampaignByID em ${cmpLink}===`);
    console.info("Teste utilizando API KEY e API IDs corretos :");
    try {
        callback = yield client.get(cmpLink);
        console.info("Success!!!=>", callback.data);
    }
    catch (error) {
        console.info("Faill!!!=>", error.message);
    }
    console.info("Teste utilizando API KEY e API IDs errados :");
    try {
        callback = yield wrongclient.get(cmpLink + "wrong");
        console.info("Faill!!!=>", callback);
    }
    catch (error) {
        console.info("Success!!!=>", error.message);
    }
});
const testAll = () => __awaiter(void 0, void 0, void 0, function* () {
    yield beforeAll();
    yield testCampaignAdd();
    yield testLoadCampaignByID();
});
testAll();
