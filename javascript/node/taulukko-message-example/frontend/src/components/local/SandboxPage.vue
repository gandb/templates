<template>
    <div>
        <ul>
          <li @click="goTo('Home')">Home</li>
          <li @click="goTo('Headers')">Headers</li>
          <li @click="goTo('Sass')">Sass</li>
          <li @click="goTo('TransitionSB')">Trans</li> 
          <li @click="goTo('DynamicSB')">Dynamic Component</li> 
          <li @click="goTo('DisplaySB')">Display</li> 
          <li @click="goTo('PainelSB')">Painel</li>           
          <li @click="goTo('GSS')">GSS</li>
        </ul>

        <component :is="component"/>

    </div>
   
</template>

<script lang="ts" scoped>
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import HomeSB from '@/components/local/sandbox/HomeSB.vue';
  import Headers from '@/components/local/sandbox/HeadersSB.vue';
  import Sass from '@/components/local/sandbox/Sass.vue';
  import TransitionSB from '@/components/local/sandbox/TransitionSB.vue'; 
  import DisplaySB from '@/components/local/sandbox/DisplaySB.vue'; 
  import PainelSB from '@/components/local/sandbox/PainelSB.vue'; 
  import DynamicSB from '@/components/local/sandbox/DynamicSB.vue'; 
  import GSS from '@/components/local/sandbox/GSS.vue'; 
  
  import bus from "@/bus"; 

@Component({
  name: 'CommonPage', 
  components: {  
    HomeSB, Headers,Sass,TransitionSB ,DisplaySB,PainelSB,DynamicSB,GSS
  }
} )
export default class CommonPage extends Vue {
     component:string="HomeSB"; 

     mounted(){
        bus.store = this.$store;
     }

     goTo(to:string)
     { 
        this.component=to;
     }
      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"> 
  #outergame li {
    cursor:pointer;
    display: inline;
    background: lightgray;
    padding: 4px;
    border-radius: 5px;
    margin-left:4px;
    color:gray;
  }
</style>
