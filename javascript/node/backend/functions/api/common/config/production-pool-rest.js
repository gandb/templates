"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductionPool {
    constructor() {
        this.BASE = "https://southamerica-east1-v-alert.cloudfunctions.net/all";
        this.profile = `${this.BASE}/profile`;
        this.campaign = `${this.BASE}/campaign`;
        this.signin = `${this.BASE}/signin`;
        this.help = `${this.BASE}/help`;
        this.backend = `${this.BASE}/backend`;
        this.frontend = `https://vol2.taulukko.com.br`;
        this.faceClientID = "";
        this.faceKeySecret = "";
        this.campaignsInvitation = (cmpID) => `${this.campaign}/${cmpID}/invitation/`;
    }
}
exports.ProductionPool = ProductionPool;
//# sourceMappingURL=production-pool-rest.js.map