import { IRestPool } from "./rest-pool";

export class LocalPool implements IRestPool {

    private BASE: string = "http://localhost";

    public profile: string = `${this.BASE}/profile`;
    public campaign: string = `${this.BASE}/campaign`;
    public signin: string = `${this.BASE}/signin`;
    public help: string = `${this.BASE}/help`;
    public backend: string = `${this.BASE}/backend`;
    public frontend: string = `${this.BASE}:8080`;

    public faceClientID: string = "";
    public faceKeySecret: string = "";

    public campaignsInvitation: (cmpID: string) => string;

    public constructor() {
        this.campaignsInvitation = (cmpID: string) => `${this.BASE}/campaign/${cmpID}/invitation/`;
    }
}
