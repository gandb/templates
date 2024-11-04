<template>
 
   <div class="t-footer-menu ui inverted segment ">
      <div class="fx-containner-default fx-type-2 fx-item "> 

         <div class="fx-item t-links">
            <ul class="ui">
               <LI><a class="item" href="/">Home</a></LI>
               <LI><router-link class="item" to="/privacy">Privacidade</router-link></LI>
               <LI><router-link class="item" to="/terms">Termos</router-link></LI>
            </ul>
         </div>
         <div class="fx-item t-comunity">
            <ul>
               <LI><a class="item" target="_blank" href="https://blog.taulukko.com.br">Blog</a></LI>
               <LI><a class="item">Comunidade</a></LI>
            </ul>
         </div>
         <div class="fx-item  "> 
         </div>
      </div>  

  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
 
import bus from "@/bus";
 


@Component({
  name: 'FooterMenu', 
  components: {
    
  }
} )
export default class FooterMenu extends Vue {
     mounted(){
         bus.store = this.$store;
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

   #outergame .t-footer-menu *
   {
      color:var(--min-gray);
   }
   @media only screen and  (orientation:portrait){
      /*Mobile Orientação Retrato*/
      .t-footer-menu .t-links
      {
        margin-left: 25%;
      }
      div.t-footer-menu ul li 
      {
         height:50px; 
         line-height: 50px;
      }
   }
   .t-body .t-footer-menu
    {
        border-radius: initial;
        background-color: #333;
        overflow: hidden;  
        margin-top: 200px;
        margin-left:-50px;
        width: 120%;

    } 

    .t-footer-menu ul li, .t-footer-menu ul li a
    {
        list-style: none;
        list-style-position: initial;
        list-style-type: none;
        color: rgba(255,255,255,0.5);
    }
 

     .t-links
     {
        -webkit-order: 0;
        -ms-flex-order: 0;
        order: 0;
        margin-left: 15%;
     }  

    .t-comunity
     {
        -webkit-order: 1;
        -ms-flex-order: 1;
        order: 1;
        margin-left: 4em;
     }    
    
</style>
