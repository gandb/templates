
import { Request, Response, Application } from "express";

import * as express from "express";

import { Context } from "../http-server";

import { Process } from "../util/process";

import * as contextVars from "../functions/context-vars";
import { IFactoryDAO } from "../IFactoryDAO";
import { FactoryDAO } from "../FactoryDAO";
import * as corsFunction from "cors";

import * as ErrorAeksia from "./error-aeksia"

const cors = corsFunction({ origin: true });

export class MiddlewareManager {

    public app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public intercept() {
        
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

    private corsConfig(req, res, next)  {
        console.log("Configure cors 2:");
        res.header('Access-Control-Allow-Credentials' , 'true');
        res.header('Content-Type',  'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, ");
        next();
    } 
 
       

    private context(req: Request, res: Response, next: () => void) {
        const proccessId: number = new Process().build();
        const context: Context = new Context(proccessId);
        //const factoryDAO: IFactoryDAO = new FactoryDAO(context);

        (req as any).context = context;
        //(req as any).factoryDAO = factoryDAO;

        next();
    }

    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    private clientkey(req: Request, res: Response, next: () => void) {
        const context: Context = (req as any).context;

        console.log("clientkey", req.headers,req.headers.clientkey);
        (context as any).ridiculo = "teste";
        context.set("teste2","teste2v");

        try{
            context.set(contextVars.CONTEXT_CLIENT_KEY, req.headers.clientkey);
        }
        catch(e)
        {
            console.log("Clientkey not loaded");
        } 

        next();
    }


     // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
     private clientID(req: Request, res: Response, next: () => void) {
        const context: Context = (req as any).context;

        try{
            context.set(contextVars.CONTEXT_CLIENT_ID, req.headers.clientid);
        }
        catch(e)
        {
            console.log("Clientid not loaded");
        }        

        next();
    }

    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    private tokenUser(req: Request, res: Response, next: () => void) {
        const context: Context = (req as any).context;
        try{
            context.set(contextVars.CONTEXT_TOKEN_USER, req.headers.tokenuser);
        }
        catch(e)
        {
            console.log("Token user not loaded");
        }   

        next();
    }

    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    private tokenClusterID(req: Request, res: Response, next: () => void) {
        const context: Context = (req as any).context;

        let clusterID: number = 1;

        if (process.env.CLUSTER_ID) {
            clusterID = parseInt(process.env.CLUSTER_ID, 10);
        } else {
            clusterID = process.pid % 1000;
        }

        context.set(contextVars.CONTEXT_CLUSTER_ID, clusterID);

        next();
    }

    // NAO FUNCIONA COM GET, SE PRECISAR PASSAR PARAMETROS SECRETOS TEM QUE SER POR EX POST
    private tokenProcessID(req: Request, res: Response, next: () => void) {
        const context: Context = (req as any).context;

        let tokenProcessID: number = process.pid;

        if (!process.env.CLUSTER_ID) {
            tokenProcessID = context.id % 1000;
        }

        context.set(contextVars.CONTEXT_PROCESS_ID, tokenProcessID);

        next();
    }

    private checkAccess(req: Request, res: Response, next: () => void) {
        const context: Context = (req as any).context;

        //TODO: Need go to database
        const clientid = context.get(contextVars.CONTEXT_CLIENT_ID);
        const clientkey = context.get(contextVars.CONTEXT_CLIENT_KEY);

        if(clientid != "IFULSEnOUgUEROmPEXhaINdYSApocHoNiCiNeYloPInEtentIn")
        {
            throw Error("Client ID is wrong");
            return;
        }

        if(clientkey != "verberSIonymNiShRosIPOWlEtrIelAnTaNGHBAnTeRedoMeTa")
        {
            //throw Error("Client key is wrong ");
            const error : ErrorAeksia = {message:"",code:""};
            return;
        }
            
        next();
    }
}
