import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

import bus from "@/bus"; 
  
import {  default as device } from './device'; 
import {  default as sandbox } from './sandbox'; 
import {  default as user } from './user'; 
import {  default as application } from './application'; 
import {  default as constants } from './constants'; 
import {  default as alert } from './alert'; 
import {  CharStateData,ShortcutEvent,ChatMessageStateData,GAME_SCREEN,GAME_SUB_SCREEN,
Shortcut,StateVuexTaulukko,UserGameStateData,UserStateData,GameStateData } from './types'; 

import {  stringUtils} from '@/libs/common';
 
import ServerConfig from "@/config/servers-choosed";

Vue.use(Vuex);
 
 
 
export default new Vuex.Store<any>({
  state: {
    portraits:{count:0,data:[]},
    subscreen:0, 
  },
  getters:{
    //leitura atomica 
    backendHostname(state) : string
    { 
       return ServerConfig.backEndHostname;
    },
    frontendHostname(state) : string
    { 
       return ServerConfig.frontEndHostname;
    },
    deviceMobile(state):boolean
    {
      if(state.sandbox.active)
      {
        return state.sandbox.mobile;
      }
      return state.device.mobile;
    },
    userImage(state):string
    {
      if(state.user.image)
      {
          return state.user.image;
      }
      return state.constants.DEFAULT_IMAGE;
    }, 
    applicationError(state):string
    {
      return state.application.error;
    }, 
    applicationStateGame(state)
    {
      return state.application.stateGame;
    }
  }
  ,
  mutations: {
    //gravacoes atomicas
    //no componente deve ser usado chamando commit
    
    
    changeDeviceMobile(state,mobile:boolean)
    {
      state.device.mobile= mobile;
    },
    changeUserId(state,id:string)
    {
      state.user.id = id;
    },
    changeUserImage(state,image:string)
    {
      state.user.image = image;
    },
    changeUserAllDataOrigin(state,data:any)
    {
      state.user.data = data;
    },
    changeUserLogged(state,logged:boolean)
    {
      state.user.logged = logged;
    },
    changeUserName(state,name:string)
    {
      state.user.name = name;
    },
    changeUserAccesslevel(state,accesslevel:number)
    {
      state.user.accesslevel = accesslevel;
    },
    changeSandboxActive(state,active:boolean)
    {
      state.sandbox.active = active;
    },
    changeSandboxPortrait(state,mobile:boolean)
    {
      state.sandbox.mobile = mobile;
    },
    changeUserSelf(state,self:string)
    {
      state.user.self = self;
    },
    addShortcut(state,shortcut:Shortcut)
    {
      state.device.shortcuts.set(shortcut.id,shortcut);
    },
    removeShortcut(state,shortcutid:string)
    {
      state.device.shortcuts.delete(shortcutid);
    },
    changeDeviceSoundEffect(state,enabled:boolean)
    {
      state.device.audio.enabledEffects = enabled;
    },
    changeDeviceSoundMusic(state,enabled:boolean)
    {
      state.device.audio.enabledMusic = enabled;
    },
    changeDeviceSoundMessage(state,enabled:boolean)
    {
      state.device.audio.enabledMessage = enabled;
    },
    registerOnResize(state,value:{id:string,callback:Function})
    {
       state.device.onresize.set(value.id, value.callback);
    }  
    ,unregisterOnResize(state,id:string)
    {
      state.device.onresize.delete(id);
    },
    changeDeviceFullscreen(state,enabled:boolean)
    {
      state.device.fullscreen = enabled;
    }, 
    cleanupUser(state)
    {
      state.user = {id:"",logged:false,accesslevel:0,image:"",name:"",self:"",
      campaignsiown:new Array<any>(),allcampaigns:new Array<any>()};
    },
   
    updateApplicationError(state,error:string)
    {
      state.application.error  = error;
    },
    changeApplicationStateGame(state,stateGame:number)
    {
      state.application.stateGame = stateGame;
    }, 
  },
  actions: {
    //gravacoes multiplas ou assincronas
    //um bom exemplo é migrar o cleanupSession no bus.ts pra ca
    //acoes podem nao receber parametros como incrementLogins mas obrigatoriamente não pode ter mais que um parametro.
    
    changeDeviceMobile(context,mobile:boolean)
    {
      context.commit("changeDeviceMobile",mobile);
    },
    changeUserImage(context,image:string)
    {
      if(!image)
      {
        context.commit("changeUserImage",context.state.constants.DEFAULT_IMAGE); 
      }

      context.commit("changeUserImage",image);
    },
    changeUserLogged({commit},logged:boolean)
    {
      commit("changeUserLogged", logged);
      if(!logged)
      {
        commit("cleanupUser");
      }
    },
    changeSandboxActive(context,active:boolean)
    { 
      context.commit("changeSandboxActive", active);
    },
    changeSandboxPortrait({commit},mobile:boolean)
    { 
      commit("changeSandboxPortrait", mobile);
    },
    changeUserName({commit},name:string)
    { 
       commit("changeUserName",name);
    },
    cleanupUserData({commit})
    {
      commit("changeUserName","");
      commit("changeUserImage","");
      commit("changeUserLogged",false);
      commit("changeUserAccesslevel",0);
      commit("changeUserSelf","");
      commit("changeUserId","");
      
    },
    updateUserData({commit},userData)
    { 

      commit("changeUserName",userData.name);
      commit("changeUserImage",userData.image);
      commit("changeUserLogged",true);
      commit("changeUserAccesslevel",userData.accesslevel);
      commit("changeUserSelf",userData.self);
      commit("changeUserId",userData.id); 
      commit("changeUserAllDataOrigin",userData);  
      
    },
    addShortcut(context,shortcut:Shortcut)
    { 
      context.commit("addShortcut",shortcut);
      context.dispatch("updateShortcuts");
      
    },
    removeShortcut(context,shortcutid:string)
    { 
      context.commit("removeShortcut",shortcutid); 
      context.dispatch("updateShortcuts");
    },
    updateShortcuts(context)
    {
      document.onkeyup = (e) => { 
        context.state.device.shortcuts.forEach( (shortcut:any)=>{

          if(shortcut.altKey === e.altKey && shortcut.key == e.which ||
            e.key === "Escape" && shortcut.key === 27)
          {
              shortcut.callback( {event:e,id:shortcut.id});
          } 
        }); 
      }; 
    },  
    registerOnResize(context,value:{id:string,callback:Function})
    {
      context.commit("registerOnResize",value);
    },
    unregisterOnResize(context,id:string)
    {
      context.commit("unregisterOnResize",id);
    },
    changeDeviceFullscreen(context,enabled:boolean)
    {
      context.commit("changeDeviceFullscreen",enabled);
    }, 
    changeApplicationStateGame(context,stateGame:number)
    {
      context.commit("changeApplicationStateGame",stateGame);
    },
    applicationHandleGameStateMonitor(context,handle:number)
    {
      context.commit("applicationHandleGameStateMonitor",handle);
    },

  },
  modules: {
    device, sandbox, user, application , 
    constants : {...constants } , alert : {...alert}
  }
})
