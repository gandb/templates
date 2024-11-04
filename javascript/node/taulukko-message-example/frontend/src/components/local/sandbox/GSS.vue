<template>
   <div class="grid-container">
    <div class="head"><H1>Head</H1></div>
    <div class="tail">Tail</div>
    <div class="left">Left</div>
    <div class="right">Right</div>
    <div class="content">Baseado no https://grid.layoutit.com/</div>
</div>
    
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus"; 


@Component({
  name: 'GSS', 
  components: {  
  }
} )
export default class GSS extends Vue {

  profileMode:number = 0;
     
     mounted(){

       bus.store = this.$store;
     }
      

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>  
  .grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "head head head head"
    "left content content right"
    "left content content right"
    "tail tail tail tail";
}
.head { grid-area: head;background-color: burlywood; height: 25vh; }
.tail { grid-area: tail;  height: 25vh;background-color: burlywood; height: 25vh;}
.left { grid-area: left; background-color:green}
.right { grid-area: right; background-color:green}
.content { grid-area: content; height: 50vh; }
</style>
