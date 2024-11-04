<template>
  <div class="common-page t-body"
      :class="{'st-logged':logged,'st-debug': debugMode, 'st-mobile':this.$store.getters.deviceMobile,
       'st-desktop': !this.$store.getters.deviceMobile }" >
       <div class="common-page-head">
        <header-menu  />        
        <auth/> 
       </div>       
        <div class="common-page-content"> 
          <!-- 
             name="trans-router-view" -->
          <transition
           enter-active-class="fadeIn"
      leave-active-class="fadeIn"
      enter-to-class="fadeOut"
      leave-to-class="fadeOut"
          >
          <router-view  />
          </transition>
        </div> 
         <div class="common-page-tail"> 
          <footer-menu/>
         </div>
  </div>
</template>

<script lang="ts">
 import { Component, Vue,Prop } from 'vue-property-decorator';
    import Auth from '@/components/Auth.vue' ;
    import HeaderMenu from '@/components/HeaderMenu.vue' ;
    import FooterMenu from '@/components/FooterMenu.vue' ;
    import {NodeList,Monadic,builder as $} from '@/monadic'; // @ is an alias to /src 
    import bus from "@/bus";
    import UserStatus from "@/UserStatus";

@Component({
  name: 'CommonPage', 
  components: {  HeaderMenu, Auth,FooterMenu
  }
} )
export default class CommonPage extends Vue {
     debugMode=false; 
       logged=false;
       
       mounted()
       {
          bus.store = this.$store;
         this.debugMode = bus.debugMode;
         bus.onDebugModeChange((newValue:boolean)=>{
            this.debugMode=newValue;
          });

         bus.emitOnRequesRegisterLoginByFacebook();

          bus.onAfterValidateTaulukkoToken((success:boolean)=>
          {
            const token = bus.taulukkoToken;
            const userStatus:UserStatus = {token,success,from:"TaulukkoToken",image:this.$store.getters["user/image"]};
            bus.emitOnUpdateLoginStatus(userStatus);
          });  

       } 
      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../assets/3thparty/semantic-ui/semantic.min.css";
    //@import "../../assets/css/flex-grid.css";
    @import "@/assets/css/variables"; 
    @import "@/assets/css/fonts"; 
    @import "@/assets/css/headers"; 
    @import "@/assets/css/common";
    @import "@/assets/css/animation";
    @import "../../assets/css/mobile.css";

     .common-page {
      display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 6fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
          "head head head head head head head head"
          "content content content content content content content content "
          "tail tail tail tail tail tail tail tail"
      }
    .common-page-head
    {
      grid-area: head;
      abackground-color: burlywood;
    }
    .common-page-content
    {
      grid-area: content;
      abackground-color: greenyellow;
    }
    .common-page-tail
    {
      grid-area: tail;
      abackground-color: burlywood;
    }
</style>
