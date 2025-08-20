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

app.get("/", async (req: Request, res: Response) => {

    try {
        const help = {
            self: restPool.help,
            help: restPool.help,
            campaigns: restPool.campaign,
            profile: restPool.profile,
            signin: restPool.signin,
            frontend: restPool.frontend,
            backend: restPool.backend,
            faceClientID: restPool.faceClientID,
        };

        res.send({ help });

    } catch (error) {
        new commonVol2.ResponseError(error).sendError(res);
        console.error("Error in help/", error);
    }
});

app.delete("/", async (req: Request, res: Response) => {
    const accesDenied: number = commonVol2.errorCodes.CODE_ACCESS_DENIED / 100;
    const code: number = commonVol2.errorCodes.CODE_ACCESS_DENIED + 1;
    res.status(Math.round(accesDenied)).send({ code });
});

app.post("/", async (req: Request, res: Response) => {
    const accesDenied: number = commonVol2.errorCodes.CODE_ACCESS_DENIED / 100;
    const code: number = commonVol2.errorCodes.CODE_ACCESS_DENIED + 1;
    res.status(Math.round(accesDenied)).send({ code });
});

app.put("/", async (req: Request, res: Response) => {
    const accesDenied: number = commonVol2.errorCodes.CODE_ACCESS_DENIED / 100;
    const code: number = commonVol2.errorCodes.CODE_ACCESS_DENIED + 1;
    res.status(Math.round(accesDenied)).send({ code });
});

export const help = app;
