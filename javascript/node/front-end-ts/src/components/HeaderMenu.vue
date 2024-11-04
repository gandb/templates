<template>
 
  <div class=" fx-item t-header-menu menu"> 
    <div class="ui secondary  menu"> 
      <div class="ui item">
          <router-link class="item" @click.native="changeMenu(menuValues.HOME)" to="/"> 
          <img class="t-logo" src="@/assets/images/logo200x100.png">
           </router-link>
      </div>
      <router-link class="item" @click.native="changeMenu(menuValues.HOME)"  :class="{'active':menu==menuValues.HOME}" to="/">Home </router-link>
      <a  v-if="!logged"  class="item"  @click.prevent="sigin"  href="/#">Inscrever-se</a>
      <router-link  v-if="vip" class="item" @click.native="changeMenu(menuValues.LIBARY)"  :class="{'active':menu==menuValues.LIBARY}" to="/libary">Biblioteca </router-link>
      <div class="t-right item">
        <div class="t-right-content">
             <image-double-button v-if="!logged" 
              text="Entrar"
              color="orange"
              image="user"
              @onClickImage="sigon" @onClickLink="sigon"/> 
              <image-double-button v-if="logged" 
              text="Sair"
              color="orange"
              :image="image"
              :icon="false"
              @onClickImage="signout" @onClickLink="signout"/>  
        </div>
      </div>
    </div> 
    <signin-modal @onBackgroundClick="onBackgroundClick" :openModal="openModal"/>
  </div>
</template>

<script lang="ts">
import { Route } from 'vue-router';
import { Component, Prop, Vue,Watch } from 'vue-property-decorator'; 
import SigninModal from '@/components/SigninModal.vue';
  import ImageDoubleButton from '@/components/ImageDoubleButton.vue';
import bus from "@/bus"; 
import UserStatus from "@/UserStatus";

@Component({
  name: 'HeaderMenu', 
  components: {
    SigninModal,ImageDoubleButton
  }
} )
export default class HeaderMenu extends Vue {
      
      openModal:boolean=false;
      menu:number=10;
      logged: boolean = false; 
      image:string="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/425px-Missing_avatar.svg.png"; 
      idade=0;
      vip:boolean=false;
      menuValues = {   
            HOME:10,
            ABOUT:20,
            LIBARY:30,
            SUBSCRIPTION:40 };

      mounted()
      { 
         bus.store = this.$store;
          this.logged = this.$store.state.user.logged; 
         
          bus.onUpdateLoginStatus((data:UserStatus)=>{ 
                this.logged =  data.success; 
                this.image = data.image;
                if(data.success)
                {
                  this.openModal=false;
                }
          });  

          bus.onLoadUserInformation((userInfo:any)=>
          {
            this.vip = userInfo.accesslevel >= bus.ACCESS_LEVEL.SUBSCRIPER;
            this.$store.dispatch("updateUserData",userInfo);
          });

          this.menu =  this.routeToMenu(this.$router.currentRoute.path); 

          bus.onRequesLoginModal((e:any)=>{
             this.sigin(e);
          });
      }
      @Watch('$route', { immediate: true, deep: true })
      onUrlChange(newVal: Route) {
        // Some action
        
        this.menu =  this.routeToMenu(this.$router.currentRoute.path);
        
      } 

      routeToMenu(route:string)
      { 
         if(route==="/about")
         {
           return this.menuValues.ABOUT;
         } 
        else if(route==="/subscription")
         {
           return this.menuValues.SUBSCRIPTION;
         } 
         else
         {
           return this.menuValues.HOME;
         }
      }

       sigin(e:Event)
       { 
          
         bus.logout(); 
         this.openModal= true;
       } 

       sigon(e:Event)
       {
          bus.logout(); 
          this.openModal= true;
       } 

        signout(e:Event)
       {
          bus.logout(); 
       }

       onBackgroundClick()
       {
         this.openModal= false;
       }

       changeMenu(newMenu:number)
       {
         this.menu = newMenu;
          this.$emit('onChangeMenu', newMenu)
       }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
 #outergame .t-logo
 {
    width:150px;
    height:auto;
 }


 #outergame .st-mobile .t-logo
 {
    width:300px;
    height:auto;
 }
  .t-header-menu
  {
    position: relative; 
  }

  .t-right
  {
    position: relative;
    width: 60vw;
    text-align: right;
    flex-direction: row-reverse;
    background-color: aquamarine;
  }

  .t-right .t-right-content
  {
    position: sticky;
    right: 10px;
  }
  .t-right .t-right-content .t-link
  {
    padding-right: 10px;
    cursor: pointer;
  }
  .t-right .t-right-content .t-avatar
  {
    display: inline-block;
    cursor: pointer;
  }

</style>
