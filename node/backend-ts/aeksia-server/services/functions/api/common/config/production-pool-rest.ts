import { IRestPool } from "./rest-pool";

export class ProductionPool implements IRestPool {

    private BASE: string = "https://southamerica-east1-v-alert.cloudfunctions.net/all";

    public profile: string = `${this.BASE}/profile`;
    public campaign: string = `${this.BASE}/campaign`;
    public signin: string = `${this.BASE}/signin`;
    public help: string = `${this.BASE}/help`;
    public backend: string = `${this.BASE}/backend`;
    public frontend: string = `https://vol2.taulukko.com.br`;

    public faceClientID: string = "";
    public faceKeySecret: string = "";

    public campaignsInvitation: (cmpID: string) => string;

    public constructor() {
        this.campaignsInvitation = (cmpID: string) => `${this.campaign}/${cmpID}/invitation/`;
    }

}
