<template>
    <div class="t-headers"> 
        <campaign  
              :campaign="campaign" :index="1" :max="4" :assets="true"
              :showInvite="true" :showConfig="true"/> 
    </div>
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
   import Campaign from '@/components/Campaign.vue';
  import bus from "@/bus"; 

@Component({
  name: 'CampaignSB', 
  components: {  Campaign
  }
} )
export default class CampaignSB extends Vue {
     campaign={
          name: "O vale do desespero",
          description: "O vale do desespero é uma aventura para 5 jogadores no sistema de D&D 5a Edição.",
          lastDate:"Último jogo em Janeiro de 2020",
          playersCount:7,
          image:"campaign-example.jpeg",
          owner:"Gustavo de Oliveira"
        };
      
      mounted(){
       bus.store = this.$store;
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"> 
 @import "../../../assets/3thparty/semantic-ui/semantic.min.css"; 
 @import "@/assets/css/headers"; 
 
    /* all commons into common.css*/  
  .t-headers
  {
    margin: 10px;
    margin-left: 20px;
  }
</style>
