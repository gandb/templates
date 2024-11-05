export class Environment {
    constructor() {
        this.localhost = "";
        this.contEnv = 0;
        this.localhost = "production";
        this.contEnv = 1;
    }
    static get instance() {
        console.log("criando  " + this._instance.contEnv++);
        return Environment._instance;
    }
}
Environment._instance = new Environment();
