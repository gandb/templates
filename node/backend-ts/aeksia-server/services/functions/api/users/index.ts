// https://cloud.google.com/firestore/docs/quickstart-mobile-web
import { Request, Response, Application } from "express";
import * as express from "express";
import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";

import * as commonVol2 from "../common/index";

import { restPool } from "../common/config/rest-config";
import { Context } from "../common/http-server";

const app: Application = express();

const middlewareManager: commonVol2.MiddlewareManager = new commonVol2.MiddlewareManager(app);

middlewareManager.intercept();
 
app.put("/", async (req: Request, res: Response)=>{

    try{
        
        res.send({ body : req.body, headers: req.headers});

    } catch (error) {
        new commonVol2.ResponseError(error).sendError(res);
        console.error("Error in help/", error);
    }
});
 

app.get("/", async (req: Request, res: Response)=>{

    try{
        const context:Context = (req as any).context;
        res.send({ query : req.query, headers: req.headers,context:context.toString()});

    } catch (error) {
        new commonVol2.ResponseError(error).sendError(res);
        console.error("Error in help/", error);
    }
});
 

export const users = app;
