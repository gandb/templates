"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_server_1 = require("../http-server");
const process_1 = require("../util/process");
const contextVars = require("../functions/context-vars");
const corsFunction = require("cors");
const cors = corsFunction({ origin: true });
class MiddlewareManager {
    constructor(app) {
        this.app = app;
    }
    intercept() {
        console.log("Midleware intercept");
        this.app.use(this.context);
        this.app.use(this.clientkey);
        this.app.use(this.clientID);
        this.app.use(this.tokenUser);
        this.app.use(this.tokenClusterID);
        this.app.use(this.tokenProcessID);
        this.app.use(this.checkAccess);
        //this.app.use(cors);
        //this.app.use(this.corsConfig);
    }
    corsConfig(req, res, next) {
        console.log("Configure cors 2:");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, ");
        next();
    }
    context(req, res, next) {
        const proccessId = new process_1.Process().build();
        const context = new http_server_1.Context(proccessId);
        //const factoryDAO: IFactoryDAO = new FactoryDAO(context);
        req.context = context;
        //(req as any).factoryDAO = factoryDAO;
        next();
    }
    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    clientkey(req, res, next) {
        const context = req.context;
        console.log("clientkey", req.headers, req.headers.clientkey);
        context.ridiculo = "teste";
        context.set("teste2", "teste2v");
        try {
            context.set(contextVars.CONTEXT_CLIENT_KEY, req.headers.clientkey);
        }
        catch (e) {
            console.log("Clientkey not loaded");
        }
        next();
    }
    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    clientID(req, res, next) {
        const context = req.context;
        try {
            context.set(contextVars.CONTEXT_CLIENT_ID, req.headers.clientid);
        }
        catch (e) {
            console.log("Clientid not loaded");
        }
        next();
    }
    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    tokenUser(req, res, next) {
        const context = req.context;
        try {
            context.set(contextVars.CONTEXT_TOKEN_USER, req.headers.tokenuser);
        }
        catch (e) {
            console.log("Token user not loaded");
        }
        next();
    }
    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    tokenClusterID(req, res, next) {
        const context = req.context;
        let clusterID = 1;
        if (process.env.CLUSTER_ID) {
            clusterID = parseInt(process.env.CLUSTER_ID, 10);
        }
        else {
            clusterID = process.pid % 1000;
        }
        context.set(contextVars.CONTEXT_CLUSTER_ID, clusterID);
        next();
    }
    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    tokenProcessID(req, res, next) {
        const context = req.context;
        let tokenProcessID = process.pid;
        if (!process.env.CLUSTER_ID) {
            tokenProcessID = context.id % 1000;
        }
        context.set(contextVars.CONTEXT_PROCESS_ID, tokenProcessID);
        next();
    }
    checkAccess(req, res, next) {
        const context = req.context;
        //TODO: Need go to database
        const clientid = context.get(contextVars.CONTEXT_CLIENT_ID);
        const clientkey = context.get(contextVars.CONTEXT_CLIENT_KEY);
        if (clientid != "IFULSEnOUgUEROmPEXhaINdYSApocHoNiCiNeYloPInEtentIn") {
            throw Error("Client ID is wrong");
            return;
        }
        if (clientkey != "verberSIonymNiShRosIPOWlEtrIelAnTaNGHBAnTeRedoMeTa") {
            return;
        }
        next();
    }
}
exports.MiddlewareManager = MiddlewareManager;
//# sourceMappingURL=midlleware.js.map