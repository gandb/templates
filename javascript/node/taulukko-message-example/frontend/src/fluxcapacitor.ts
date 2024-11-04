"use strict";

import Vue from "vue";
import  axios, { AxiosInstance } from 'axios';  
import UserStatus from "@/UserStatus";
import { Route } from 'vue-router';
import {Store } from 'vuex';
import { StateVuexTaulukko, Shortcut } from './store/types';
 

import {  Watch } from 'vue-property-decorator';


class FluxCapacitor extends Vue
{

   constructor()
   {
      super(); 
      this.start();
   }

   addAlert(key:string,alert:any)
   {
      //adiciona um alerta
   }
   removeAlert(key:string,alert:any)
   {
      //remove um alerta
   }
   printAlerts()
   {
      //imprime alertas para efeito de debug
   }
   start()
   {
      //inicia o acionamento de notifications dos alertas habilitados
   }
   notifySystem(alert:any)
   {
      //manda a notificação para um determinado alerta
      Notification.requestPermission().then(function (permission) {
         console.log(permission);
         
         var title = "JavaScript Jeep 2";
         var icon = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
         var body = "It's Your boarding time";
         window.setTimeout( ()=>{
         var notification = new Notification(title, { body, icon });
         },5000);
      });
   }

}


var fluxCapacitor:FluxCapacitor = new FluxCapacitor();

export default fluxCapacitor;
