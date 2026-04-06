

import express, { Application, Request, Response, NextFunction } from 'express'; 
export default abstract class DomainHandler {
  public app: Application;

  constructor() {
    this.app = express(); 
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.configureRoutes();
  }
 
  public get application():Application{
    return this.app;
  }
   abstract configureRoutes(): void ;
  

  public sendError(res: Response, errorCode: number, data: any): void {
    res.status(errorCode).json({
      errorCode: errorCode,
      data: data
    });
  }
}