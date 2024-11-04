class ServerConfig {
    constructor() {
        //urls to servers config
        this.frontEndHostname = "http://localhost:8080";
        this.backEndHostname = "http://localhost:80";
        //login config
        this.loginFacebookEnabled = true;
        this.loginDebugEnabled = true;
        this.loginGoogleEnabled = true;
    }
}
export default new ServerConfig();
//# sourceMappingURL=servers-local.js.map