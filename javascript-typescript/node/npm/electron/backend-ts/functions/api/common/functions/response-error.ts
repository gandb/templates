import { Request, Response } from "express";
import { TaulukkoError } from "../common-error"; 

export class ResponseError extends Error {

    public readonly message: string;
    public readonly status: number;
    public readonly substatus: number;

    constructor(error?: TaulukkoError, message?: string, status?: number, substatus?: number) {
        super((error) ? error.message : message);

        if (!error && !message) {
            this.message = "INVALID! Error or message is required";
            this.status = 503;
            this.substatus = 99;
            return;
        }

        if (error) {

            if (!error.code) {
                this.message = "INVALID! Taulukko Error Code is required";
                this.status = 503;
                this.substatus = 98;
                return;
            }

            if (error.code < 1000) {
                this.message = "INVALID! Taulukko Error Code";
                this.status = 503;
                this.substatus = 98;
                return;
            }
            this.message = error.message;
            this.status = Math.round(error.code / 100);
            this.substatus = error.code % 100;
            return;
        }

        this.message = message;
        this.status = status;
        this.substatus = substatus;
    }

    public sendError(res: Response): void {
        res.status(this.status).send(this);
    }

}
