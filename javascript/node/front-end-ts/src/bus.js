import Vue from "vue";
import axios from 'axios';
class BusVue extends Vue {
    constructor() {
        super();
        this.updateDataInformationSemaphore = false;
        this.pastelColors = [
            "#ACECD5", "#FFF9AA", "#FFD5B8", "#FFB9B3",
            "#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8", "#FFDFD3",
            "#F692BC", "#F4ADC6", "#FDFD95", "#AAC5E2", "#6891C3",
            "#C1E7E3", "#DCFFFB", "#799FCB", "#95B4CC", "#AFC7D0",
            "#EEF1E6", "#FEC9C9", "#F9665E",
            "#8DA290", "#BEC7B4", "#DEE2D9", "#FCF1D8", "#F2CBBB"
        ];
        this.strongColors = [
            "#003333", "#330000", "#220000", "#110000",
            "#776379", "#6B597C", "#835B76", "#93737D", "#6C5F5A",
            "#79485D", "#503941", "#81814C", "#3E4853", "#364B65",
            "#637775", "#606F6D", "#41556C", "#404E58", "#4C575B",
            "#7F817B", "#7C6262", "#6C2C29",
            "#58655A", "#767C70", "#6A6C68", "#6A655B", "#62524C"
        ];
        this.fixScrollError();
    }
    /* PRIVATE FUNCTIONS */
    fixScrollError() {
        window.setInterval(() => {
            const pageXOffset = window.pageXOffset;
            const browserError = pageXOffset !== 0;
            if (browserError) {
                console.warn("Erro detectado, corrigindo...");
                this.moveToLeft();
            }
        }, this.INTERVAL_LOW_PRIORITY);
    }
    cleanupSession() {
        this.store.dispatch("cleanupUserData");
        this.cleanLocalStorage();
        this._api = null;
    }
    cleanLocalStorage() {
        localStorage.removeItem("taulukko_token");
        localStorage.removeItem("autoLogin");
        localStorage.removeItem("debugMode");
        localStorage.removeItem("facebook");
    }
    updateUserData() {
        const soundMessage = this.soundMessage === null || this.soundMessage === undefined || this.soundMessage === "true";
        const soundMusic = this.soundMusic === null || this.soundMusic === undefined || this.soundMusic === "true";
        const soundEffect = this.soundEffect === null || this.soundEffect === undefined || this.soundEffect === "true";
        this.store.commit("changeDeviceSoundMessage", soundMessage);
        this.store.commit("changeDeviceSoundMusic", soundMusic);
        this.store.commit("changeDeviceSoundEffect", soundEffect);
        if (!this.taulukkoToken) {
            return;
        }
        if (this.updateDataInformationSemaphore) {
            return;
        }
        this.updateDataInformationSemaphore = true;
        this.api.post('/profile')
            .then((response) => {
            this.store.dispatch("updateUserData", response.data);
            this.emitOnLoadUserInformation(response.data);
        })
            .catch((error) => {
            // handle error
            // TODO: deveria dar um aviso no localstorage de erro pro usuario saber que deve tentar se logar de novo depois de uns instantes
            //TODO: para corrigir o erro de token invalido, precisa desligar a linha de cleanupSession pois ela apaga o cenario de erro
            this.cleanupSession();
            console.error("updateUserData: Servidor de backend esta online? Erro desconhecido usando token :" + this.taulukkoToken, error);
        })
            .then(() => {
            this.updateDataInformationSemaphore = false;
        });
    }
    /* VARIAVEIS E CONSTANTES COMUNS */
    get api() {
        if (!this._api) {
            const config = { baseURL: this.store.getters.backendHostname };
            console.log("registring api ", config);
            this._api = axios.create(config);
        }
        return this._api;
    }
    get ACCESS_LEVEL() {
        return {
            BANNED: -100,
            INVALID: -50,
            NORMAL: 0,
            GUEST: 50,
            SUBSCRIPER: 100,
            ADMIN: 1000,
        };
    }
    get INTERVAL_LOW_PRIORITY() {
        return 3000;
    }
    get INTERVAL_MID_PRIORITY() {
        return 1000;
    }
    get MAX_GAME_IMG_SIZE_KB() {
        return 200;
    }
    get facebookClientId() {
        if (process.env.NODE_ENV &&
            process.env.NODE_ENV == "production") {
            return "186223299284332";
        }
        return "615585672590336";
    }
    get frontendHostname() {
        if (process.env.NODE_ENV &&
            process.env.NODE_ENV == "production") {
            return "http://vol2.taulukko.com.br";
        }
        return "http://localhost:8080";
    }
    get taulukkoToken() {
        let ret = localStorage.getItem("taulukko_token");
        ret = (ret == null) ? "" : ret;
        return ret;
    }
    get autoLogin() {
        const autoLogin = localStorage.getItem("autoLogin");
        return autoLogin === "true";
    }
    set soundEffect(value) {
        localStorage.setItem("soundEffect", value);
    }
    set soundMusic(value) {
        localStorage.setItem("soundMusic", value);
    }
    set soundMessage(value) {
        localStorage.setItem("soundMessage", value);
    }
    get soundEffect() {
        return localStorage.getItem("soundEffect");
    }
    get soundMusic() {
        return localStorage.getItem("soundMusic");
    }
    get soundMessage() {
        return localStorage.getItem("soundMessage");
    }
    set autoLogin(value) {
        localStorage.setItem("autoLogin", (value) ? "true" : "false");
    }
    set taulukkoToken(token) {
        localStorage.setItem("taulukko_token", token);
        if (token) {
            this.api.interceptors.request.use((config) => {
                //ATENCAO! Só funciona para post, se precisar de parametros tem que ser POST
                if (!config.data) {
                    config.data = {};
                }
                config.data['tokenuser'] = token;
                return config;
            }, (error) => {
                return Promise.reject(error);
            });
        }
        this.updateUserData();
    }
    get debugMode() {
        let debugModeStr = String(localStorage.getItem("debugMode"));
        debugModeStr = (debugModeStr === "true") ? debugModeStr : "false";
        return debugModeStr === "true";
    }
    get facebook() {
        return localStorage.getItem("facebook");
    }
    set facebook(token) {
        localStorage.setItem("facebook", token);
    }
    /* EVENTOS COMUNS */
    emitOnLoadUserInformation(userInformation) {
        this.$emit("onLoadUserInformation", userInformation);
    }
    onLoadUserInformation(callback) {
        this.$on("onLoadUserInformation", callback);
    }
    newImage() {
        const ret = new Image();
        ret.crossOrigin = "anonymous";
        return ret;
    }
    resizeImg(img, maxWidth, maxHeight) {
        const padding = true;
        const imgWidth = img.width;
        const imgHeight = img.height;
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        canvasContext.fillStyle = "#000";
        canvasContext.fillRect(0, 0, maxWidth, maxHeight);
        let startX = 0;
        let startY = 0;
        let newWidth = maxWidth;
        let newHeight = maxHeight;
        const paddingW = (maxWidth / imgWidth) > (maxHeight / imgHeight);
        const paddingH = (maxWidth / imgWidth) < (maxHeight / imgHeight);
        const noPadding = (maxWidth / imgWidth) == (maxHeight / imgHeight);
        if (paddingW) {
            const radio = (maxHeight / imgHeight);
            newWidth = Math.round(radio * imgWidth);
            startX = Math.round((maxWidth - newWidth) / 2);
        }
        else if (paddingH) {
            const radio = (maxWidth / imgWidth);
            newHeight = Math.round(radio * imgHeight);
            startY = Math.round((maxHeight - newHeight) / 2);
        }
        canvasContext.drawImage(img, startX, startY, newWidth, newHeight);
        return canvas.toDataURL();
    }
    img2b64(img, type = "image/png", quality = "") {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL(type, quality);
    }
    emitOnUpdateLoginStatus(userUpdateInformation) {
        this.store.dispatch("changeUserLogged", userUpdateInformation.success);
        if (userUpdateInformation.success) {
            this.autoLogin = true;
            if (userUpdateInformation.token) {
                this.taulukkoToken = userUpdateInformation.token;
                this.updateUserData();
            }
            else {
                this.autoLogin = false;
                console.error(userUpdateInformation, "Não foi logado com sucesso se não tiver um token do taulukko");
                throw new Error("Não foi logado com sucesso se não tiver um token do taulukko");
            }
            if (userUpdateInformation.image) {
                //no caso de sucesso e somente se tiver imagem, ele atualiza a imagem
                //se não ele mantém a antiga
                this.store.dispatch("changeUserImage", userUpdateInformation.image);
            }
            else {
                //TODO: //quem le imagem do userupdateinformation poderia ler diretamente do store
                userUpdateInformation.image = this.store.getters.userImage;
            }
        }
        else {
            this.cleanupSession();
        }
        this.$emit("onUpdateLoginStatus", userUpdateInformation);
    }
    onUpdateLoginStatus(callback) {
        this.$on("onUpdateLoginStatus", callback);
    }
    onAfterValidateTaulukkoToken(callback) {
        this.$on("onAfterValidateTaulukkoToken", callback);
    }
    emitOnAfterValidateTaulukkoToken(success) {
        //every time after invalidate token, must change login status
        if (!success) {
            this.autoLogin = false;
        }
        const token = (success) ? this.taulukkoToken : "";
        const image = (success) ? this.store.getters.userImage : this.store.state.constants.DEFAULT_IMAGE;
        const dataUpdateLoginStatus = { token, success, image, from: "TaulukkoToken" };
        this.emitOnUpdateLoginStatus(dataUpdateLoginStatus);
        this.store.dispatch("changeUserLogged", success);
    }
    emitOnRequesLoginModal() {
        this.$emit("onRequesLoginModal");
    }
    onRequesLoginModal(callback) {
        this.$on("onRequesLoginModal", callback);
    }
    emitOnRequesRegisterLoginByFacebook() {
        this.$emit("onRequesRegisterLoginByFacebook");
    }
    onRequesRegisterLoginByFacebook(callback) {
        this.$on("onRequesRegisterLoginByFacebook", callback);
    }
    emitOnAfterGoogleLogin(googleUser) {
        this.$emit("onAfterGoogleLogin", googleUser);
    }
    onAfterGoogleLogin(callback) {
        this.$on("onAfterGoogleLogin", callback);
    }
    //Chamado apenas para validar o token e logar o usuário (varios lugares chamam e um executa)
    emitOnRequestUpdateUserInfo(taulukoToken) {
        this.$emit("onRequestUpdateUserInfo", taulukoToken);
    }
    //ouvido por quem executa
    onRequestUpdateUserInfo(callback) {
        this.$on("onRequestUpdateUserInfo", callback);
    }
    emitOnCreateGAPI(etc) {
        throw new Error("Only is possible create that event by javascript into index.html file");
    }
    onCreateGAPI(callback) {
        window.addEventListener('onCreateGAPI', callback);
    }
    emitOnDebugModeChange(newStatus) {
        this.$emit("onDebugModeChange", newStatus);
        localStorage.setItem("debugMode", String(newStatus));
    }
    onDebugModeChange(callback) {
        this.$on('onDebugModeChange', callback);
    }
    emitOnRouteChange(from, to) {
        this.$emit('onRouteChange', { from, to });
    }
    onRouteChange(callback) {
        this.$on('onRouteChange', callback);
    }
    /* FUNCOES COMUNS */
    needRedirect(routePath) {
        const found = this.store.state.application.needRedirectPages.find((element) => element == routePath) != undefined;
        return found;
    }
    moveToLeft() {
        //a mudança para hidden e novamente para scroll no overflow é por conta de um bug nos navegadores Android
        //para saber mais sobre o workarround : https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript
        const body = document.getElementsByTagName("body")[0];
        body.style.overflowX = "auto";
        window.scrollTo({ left: 0 });
        body.style.overflowX = "hidden";
    }
    moveToUP() {
        //a mudança para hidden e novamente para scroll no overflow é por conta de um bug nos navegadores Android
        //para saber mais sobre o workarround : https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript
        const body = document.getElementsByTagName("body")[0];
        body.style.overflowY = "hidden";
        window.scrollTo({ top: 0 });
        body.style.overflowY = "auto";
    }
    logoutFromGoogleAuth() {
        const gapi = window.gapi;
        const alreadyCreatedGAPI = gapi;
        const wasLoggedByGoogle = alreadyCreatedGAPI && gapi.auth2;
        if (wasLoggedByGoogle) {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.info('User signed out from google.');
            }).catch((e) => {
                console.warn('Erro ao deslogar pelo Google', e);
            });
        }
    }
    logout() {
        this.logoutFromGoogleAuth();
        this.autoLogin = false;
        const dataUpdateLoginStatus = { token: "", success: false, image: this.store.state.constants.DEFAULT_IMAGE, from: "Taulukko Logout" };
        this.emitOnUpdateLoginStatus(dataUpdateLoginStatus);
    }
    dateToStringTime(date) {
        const hour = date.getHours();
        const hourF = (hour < 10) ? '0' + hour : hour.toString();
        const minute = date.getMinutes();
        const minuteF = (minute < 10) ? '0' + minute : minute.toString();
        return hourF + ":" + minuteF;
    }
    dateToStringDateTime(date) {
        const dia = date.getDate().toString();
        const diaF = (dia.length == 1) ? '0' + dia : dia;
        const mes = (date.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
        const mesF = (mes.length == 1) ? '0' + mes : mes;
        const anoF = date.getFullYear();
        return diaF + "/" + mesF + "/" + anoF + " " + this.dateToStringTime(date);
    }
    executeAfterVueJS(func) {
        //settimeout executa após a main thread estar vazia
        //para garantir que todo o ciclo de vida do vuejs tenha sido executado
        //para mais informações leia : https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
        return () => { window.setTimeout(func, 1); };
    }
    isMobile() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        }
        else {
            return false;
        }
    }
}
export default new BusVue();
//# sourceMappingURL=bus.js.map