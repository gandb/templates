class ServerConfig {
    constructor() {
        //url to servers config
        this.frontEndHostname = "https://valert.vriend.com.br/";
        this.backEndHostname = "https://southamerica-east1-v-alert.cloudfunctions.net/all";
        //login config
        this.loginFacebookEnabled = true;
        this.loginDebugEnabled = true;
        this.loginGoogleEnabled = true;
    }
}
export default new ServerConfig();
//# sourceMappingURL=servers-beta.js.map