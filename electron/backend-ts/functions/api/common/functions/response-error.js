"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(error, message, status, substatus) {
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
    sendError(res) {
        res.status(this.status).send(this);
    }
}
exports.ResponseError = ResponseError;
//# sourceMappingURL=response-error.js.map