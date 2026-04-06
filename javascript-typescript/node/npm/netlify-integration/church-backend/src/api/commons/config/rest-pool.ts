export interface IRestPool {
    profile: string;
    campaign: string;
    signin: string;
    help: string;
    backend: string;
    frontend: string;
    faceClientID: string;
    faceKeySecret: string;

    campaignsInvitation: (s: string) => string;
}
