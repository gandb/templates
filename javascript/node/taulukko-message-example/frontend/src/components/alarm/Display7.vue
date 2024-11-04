<template>
  <div class="background" ref="background">
    <label class="displaybg" ref="displaybg">8</label>
    <label class="display" ref="display">{{value|oneDigit}}{{dotValue}}</label>
  </div>
</template> 
<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
import {StateVuexTaulukko} from '@/store/types';
import bus from "@/bus"; 

export interface ButtonMouseEvent
{ 
      event:MouseEvent;
      id:string; 
}

Vue.filter("oneDigit",(value:string)=>{  
  if(value.length<1)
  {
    return "8";
  }
  return value.substring(0,1);
});

@Component({
  name: 'Display7', 
  components: { 
  }
} )
export default class Display7 extends Vue { 

@Prop(  {required: false, type : String,default:"#00FF00"} ) color !: string ;
@Prop(  {required: false, type : String,default:"#000000"} ) bgcolor !: string ;
@Prop(  {required: false, type : Boolean,default:false} ) dot !: boolean ;
@Prop(  {required: false, type : String,default:"8"} ) value !: string ;
@Prop(  {required: false, type : Number,default:22} ) fontSize !: number ;

 
 
  mounted(){
    bus.store = this.$store; 

    const display:HTMLLabelElement = this.$refs.display as HTMLLabelElement;    
    display.style.color = this.color;
    display.style.fontSize = this.fontSize + "px";

    //fix char "1" position
    if(this.value.startsWith("1"))
    {
      display.classList.add("one");
    }
    else{
      display.classList.remove("one");
    }
    
    const displaybg:HTMLLabelElement = this.$refs.displaybg as HTMLLabelElement;
    displaybg.style.fontSize = this.fontSize + "px";

    const background:HTMLDivElement = this.$refs.background as HTMLDivElement;
    background.style.background=this.bgcolor;
    background.style.width = Math.round( this.fontSize  * 0.6)  + "px";
  }

  get dotValue():string{
    if(this.dot)
    {
      return ".";
    }
    return "";
  }
 

  @Watch("value")  @Watch("width")  @Watch("height")
  onChangeCommon(value:string )
  { 
       const display:HTMLLabelElement = this.$refs.display as HTMLLabelElement;
      if(value.startsWith("1"))
      {
        display.classList.add("one");
      }
      else{
        display.classList.remove("one");
      }
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .background
  {
    position: relative;
    padding-bottom:0em;
    width:fit-content;
    
    .displaybg {
      font-family: 'Display';      
      color:gray;
      position: absolute;
      top:0.01em;
      left:0.01em;
      font-style: italic;
      

    }
    .display {
      font-family: 'Display';      
      padding:0.02em;
      padding-right:0.2em;
      padding-bottom:0em;      
      font-style: italic;
      font-variant-numeric: tabular-nums;
      position:relative;
      z-index: 100;
    }
    .display.one{
      padding:0.3em;
    }
  }
 
</style>
