// https://cloud.google.com/firestore/docs/quickstart-mobile-web
import { Request, Response, Application } from "express";
import * as express from "express";
import * as fs from "fs";
import * as ejs from "ejs";

import { help } from "./functions/api/help"; 
import { pingpong } from "./functions/api/pingpong"; 
import { users } from "./functions/api/users"; 


import * as bodyParser from "body-parser";

import * as sourceMapSupportRegister from "source-map-support/register";

// const PORT: number = Number(process.env.PORT) || 80;
const PORT: number = 80;

const app = express();

const API_VERSION : string = "v1";

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


app.use(corsConfig);
bodyPartConfig();

//funcoes
function corsConfig(req, res, next)  {
    console.log("Configure cors :");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
}



function bodyPartConfig()
{
    app.use(bodyParser.json({ limit: "1mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
}


// ROUTES
app.use(`/${API_VERSION}/help`, help);
app.use(`/${API_VERSION}/pingpong`, pingpong);
app.use(`/${API_VERSION}/users`,users);


export const all = app;