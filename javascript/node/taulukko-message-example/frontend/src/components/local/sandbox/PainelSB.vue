<template>
    <div class="t-content">
      <div class="head">
          <H1>PainelSB</H1>
      </div>
      <div class="center"  > 
         <painel/>
      </div>      
      
    </div>
    
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus";    
  
  import {default as Painel} from "@/components/alarm/Painel.vue";


@Component({
  name: 'DisplaySB', 
  components: {  
    Painel
  }
} )
export default class DisplaySB extends Vue {

  profileMode:number = 0;
  client:any;
  socket:any;
  
     
     mounted(){

       bus.store = this.$store;


     }
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  .t-content 
  {
    color:white;
    margin-left:20px;
     display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    grid-template-rows: 3fr;
    gap: 0px 0px;
    grid-template-areas:
      "head head head"
      ". center ."
      "tail tail tail";

     DIV
     {
       background-color: transparent;
     } 

    .head{
       grid-area: head;
    }  
    
    .tail{
       grid-area: tail;
    }  
    
    .left{
       grid-area: left;
    }  
    
    .right{
       grid-area: right;
    }  

    
    .center{
       grid-area: center;
    }  

    .t-actions BUTTON{
      display: inline;
    }

     .displays{
       background-color: black;
       width: fit-content;
       padding-left: 10px;
       padding-right: 10px;
     }  
    .displays > *
    {
      display: inline-block;
    } 

    .leds>DIV
    {
      display: inline-block;
      width:100%;
      margin-top:1em;
    }
    
  }
  
</style>
