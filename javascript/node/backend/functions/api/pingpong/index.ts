// https://cloud.google.com/firestore/docs/quickstart-mobile-web
import { Request, Response, Application } from "express";
import * as express from "express";  
 

const app: Application = express();
 
 
//eg: http://localhost/v1/pingpong/Isto%20%C3%A9%20um%20exemplo
app.get("/:queryParameter", async (req: Request, res: Response) => {
  
    try{ 
        res.send({ output : req.params.queryParameter });

    } catch (error) {
        res.send("Error in help/");
        
        console.error("Error in help/", error);
    }
});
 

export const pingpong = app;
