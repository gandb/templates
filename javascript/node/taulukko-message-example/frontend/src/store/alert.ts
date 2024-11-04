import { client } from 'websocket';
import Vue from 'vue';
import  { ActionContext } from 'vuex';
import {  CharStateData ,UserGameStateData, ChatMessageStateData, GAME_SCREEN,GameStateData,
  GAME_SUB_SCREEN} from './types'; 
import bus from "@/bus";
import  { AxiosResponse } from 'axios'; 
import router from '../router/index';
import {  stringUtils} from '@/libs/common';

 

//TODO: Criar um subnivel de namespace para game chamado chars

export default {
  namespaced:true,
  state:  {selected:null},
  getters: {
    chars(state:any):Map<string,CharStateData>
    {
       const ret : Map<string,CharStateData> = new Map();


      if(!state.chars)
      {
        return ret;
      }

       for(let char  of state.chars)
       {
          ret.set(char.id,char);
       }
       return ret;
    }, 
    
  } ,
  mutations: { 
    select(state:any,alert:any)
    { 
        state.selected = alert;
    }, 
  },
  actions:{

    async insertAlert(context:ActionContext<any,any>,alert:any)
    {
      await bus.api.put('/alert' ,alert);
    },

    async removeAlert(context:ActionContext<any,any>,id:string)
    {
      console.log("removeAlert:100 =>",id);
      await bus.api.delete('/alert/' + id);
    },

    async openEdit(context:ActionContext<any,any>,alert:any)
    {
      context.commit("select",alert);
      router.push("ConfigAlert");
    }, 
    async updateAlert(context:ActionContext<any,any>,alert:any)
    {
      console.log("updateAlert:100 =>",alert);
      await bus.api.post('/alert/' ,alert);
    }, 

    
  }
};