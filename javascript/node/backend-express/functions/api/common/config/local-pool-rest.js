"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalPool = void 0;
class LocalPool {
    constructor() {
        this.BASE = "http://localhost";
        this.profile = `${this.BASE}/profile`;
        this.campaign = `${this.BASE}/campaign`;
        this.signin = `${this.BASE}/signin`;
        this.help = `${this.BASE}/help`;
        this.backend = `${this.BASE}/backend`;
        this.frontend = `${this.BASE}:8080`;
        this.faceClientID = "";
        this.faceKeySecret = "";
        this.campaignsInvitation = (cmpID) => `${this.BASE}/campaign/${cmpID}/invitation/`;
    }
}
exports.LocalPool = LocalPool;
