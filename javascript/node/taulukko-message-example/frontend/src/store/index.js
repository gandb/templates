import Vue from 'vue';
import Vuex from 'vuex';
import subscribers from './subscripters';
import { default as device } from './device';
import { default as sandbox } from './sandbox';
import { default as user } from './user';
import { default as application } from './application';
import { default as constants } from './constants';
import { default as alert } from './alert';
import ServerConfig from "@/config/servers-choosed";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        portraits: { count: 0, data: [] },
        subscreen: 0,
    },
    getters: {
        //leitura atomica 
        backendHostname(state) {
            return ServerConfig.backEndHostname;
        },
        frontendHostname(state) {
            return ServerConfig.frontEndHostname;
        },
        deviceMobile(state) {
            if (state.sandbox.active) {
                return state.sandbox.mobile;
            }
            return state.device.mobile;
        },
        userImage(state) {
            if (state.user.image) {
                return state.user.image;
            }
            return state.constants.DEFAULT_IMAGE;
        },
        applicationError(state) {
            return state.application.error;
        },
        applicationStateGame(state) {
            return state.application.stateGame;
        }
    },
    mutations: {
        //gravacoes atomicas
        //no componente deve ser usado chamando commit
        changeDeviceMobile(state, mobile) {
            state.device.mobile = mobile;
        },
        changeUserId(state, id) {
            state.user.id = id;
        },
        changeUserImage(state, image) {
            state.user.image = image;
        },
        changeUserAllDataOrigin(state, data) {
            state.user.data = data;
        },
        changeUserLogged(state, logged) {
            state.user.logged = logged;
        },
        changeUserName(state, name) {
            state.user.name = name;
        },
        changeUserAccesslevel(state, accesslevel) {
            state.user.accesslevel = accesslevel;
        },
        changeSandboxActive(state, active) {
            state.sandbox.active = active;
        },
        changeSandboxPortrait(state, mobile) {
            state.sandbox.mobile = mobile;
        },
        changeUserSelf(state, self) {
            state.user.self = self;
        },
        addShortcut(state, shortcut) {
            state.device.shortcuts.set(shortcut.id, shortcut);
        },
        removeShortcut(state, shortcutid) {
            state.device.shortcuts.delete(shortcutid);
        },
        changeDeviceSoundEffect(state, enabled) {
            state.device.audio.enabledEffects = enabled;
        },
        changeDeviceSoundMusic(state, enabled) {
            state.device.audio.enabledMusic = enabled;
        },
        changeDeviceSoundMessage(state, enabled) {
            state.device.audio.enabledMessage = enabled;
        },
        registerOnResize(state, value) {
            state.device.onresize.set(value.id, value.callback);
        },
        unregisterOnResize(state, id) {
            state.device.onresize.delete(id);
        },
        changeDeviceFullscreen(state, enabled) {
            state.device.fullscreen = enabled;
        },
        cleanupUser(state) {
            state.user = { id: "", logged: false, accesslevel: 0, image: "", name: "", self: "", campaignsiown: new Array(), allcampaigns: new Array() };
        },
        updateApplicationError(state, error) {
            state.application.error = error;
        },
        changeApplicationStateGame(state, stateGame) {
            state.application.stateGame = stateGame;
        },
    },
    actions: {
        //gravacoes multiplas ou assincronas
        //um bom exemplo é migrar o cleanupSession no bus.ts pra ca
        //acoes podem nao receber parametros como incrementLogins mas obrigatoriamente não pode ter mais que um parametro.
        changeDeviceMobile(context, mobile) {
            context.commit("changeDeviceMobile", mobile);
        },
        changeUserImage(context, image) {
            if (!image) {
                context.commit("changeUserImage", context.state.constants.DEFAULT_IMAGE);
            }
            context.commit("changeUserImage", image);
        },
        changeUserLogged({ commit }, logged) {
            commit("changeUserLogged", logged);
            if (!logged) {
                commit("cleanupUser");
            }
        },
        changeSandboxActive(context, active) {
            context.commit("changeSandboxActive", active);
        },
        changeSandboxPortrait({ commit }, mobile) {
            commit("changeSandboxPortrait", mobile);
        },
        changeUserName({ commit }, name) {
            commit("changeUserName", name);
        },
        cleanupUserData({ commit }) {
            commit("changeUserName", "");
            commit("changeUserImage", "");
            commit("changeUserLogged", false);
            commit("changeUserAccesslevel", 0);
            commit("changeUserSelf", "");
            commit("changeUserId", "");
        },
        updateUserData({ commit }, userData) {
            commit("changeUserName", userData.name);
            commit("changeUserImage", userData.image);
            commit("changeUserLogged", true);
            commit("changeUserAccesslevel", userData.accesslevel);
            commit("changeUserSelf", userData.self);
            commit("changeUserId", userData.id);
            commit("changeUserAllDataOrigin", userData);
        },
        addShortcut(context, shortcut) {
            context.commit("addShortcut", shortcut);
            context.dispatch("updateShortcuts");
        },
        removeShortcut(context, shortcutid) {
            context.commit("removeShortcut", shortcutid);
            context.dispatch("updateShortcuts");
        },
        updateShortcuts(context) {
            document.onkeyup = (e) => {
                context.state.device.shortcuts.forEach((shortcut) => {
                    if (shortcut.altKey === e.altKey && shortcut.key == e.which ||
                        e.key === "Escape" && shortcut.key === 27) {
                        shortcut.callback({ event: e, id: shortcut.id });
                    }
                });
            };
        },
        registerOnResize(context, value) {
            context.commit("registerOnResize", value);
        },
        unregisterOnResize(context, id) {
            context.commit("unregisterOnResize", id);
        },
        changeDeviceFullscreen(context, enabled) {
            context.commit("changeDeviceFullscreen", enabled);
        },
        changeApplicationStateGame(context, stateGame) {
            context.commit("changeApplicationStateGame", stateGame);
        },
        applicationHandleGameStateMonitor(context, handle) {
            context.commit("applicationHandleGameStateMonitor", handle);
        },
    },
    modules: {
        subscribers, device, sandbox, user, application,
        constants: { ...constants }, alert: { ...alert }
    }
});
//# sourceMappingURL=index.js.map