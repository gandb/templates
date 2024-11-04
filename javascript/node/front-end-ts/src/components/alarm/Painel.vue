<template>
  <div class="background" ref="background">
     <TimeDisplay class="time1" label="DESTINATION TIME" color="red" :date="destination"/>
      <TimeDisplay  class="time2" label="PRESENT TIME" color="green"  :date="now"/>
      <TimeDisplay class="time3" label="LAST TIME DEPARTED" color="yellow"  :date="last"/>
  </div>
</template> 
<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
import {StateVuexTaulukko} from '@/store/types';
import bus from "@/bus"; 
import {default as TimeDisplay} from "@/components/alarm/TimeDisplay.vue";

export interface ButtonMouseEvent
{ 
      event:MouseEvent;
      id:string; 
}
 
@Component({
  name: 'Painel', 
  components: { TimeDisplay
  }
} )
export default class Painel extends Vue { 

@Prop(  {required: false, type : Date,default:()=>new Date()} ) destination !: Date ;
@Prop(  {required: false, type : Date,default:()=>new Date()} ) last !: Date ;

now:Date = new Date();
 
  mounted(){
    bus.store = this.$store; 

    setInterval(()=>{
      const newDate:Date = new Date();
      this.now=newDate;
    },10000);
  }
 
 

  @Watch("enabled")  @Watch("width")  @Watch("height")
  onChangeCommon(after:boolean )
  { 
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .background
  {
    position: relative;
    display: grid;
    grid-template-columns:1fr ;
    grid-template-rows: 3fr;
    gap: 0px 0px;
    grid-template-areas:
      "head"
      "center"
      "tail";
    

    .time1{
      grid-area: head;
    }
    .time2{
      grid-area: center;
    }    
    .time3{
      grid-area: tail;
    }
  }
 
</style>
