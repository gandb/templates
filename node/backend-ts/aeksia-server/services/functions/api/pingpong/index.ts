// https://cloud.google.com/firestore/docs/quickstart-mobile-web
import { Request, Response, Application } from "express";
import * as express from "express";
import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";

import * as commonVol2 from "../common/index";

import { restPool } from "../common/config/rest-config";

const app: Application = express();

const middlewareManager: commonVol2.MiddlewareManager = new commonVol2.MiddlewareManager(app);

middlewareManager.intercept();

app.get("/:queryParameter", async (req: Request, res: Response) => {
  
    try{
        res.send({ output : req.params.queryParameter });

    } catch (error) {
        new commonVol2.ResponseError(error).sendError(res);
        console.error("Error in help/", error);
    }
});
 

export const pingpong = app;
