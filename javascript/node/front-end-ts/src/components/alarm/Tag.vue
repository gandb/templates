<template>
  <div class="background" ref="background">
    <label class="display" ref="display">{{value}}</label>
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
 
@Component({
  name: 'Tag', 
  components: { 
  }
} )
export default class Tag extends Vue { 

@Prop(  {required: false, type : String,default:"#FFFFFF"} ) color !: string ;
@Prop(  {required: false, type : String,default:"#FF0000"} ) bgcolor !: string ;
@Prop(  {required: false, type : String,default:"TAG"} ) value !: string ;
@Prop(  {required: false, type : Number,default:22} ) fontSize !: number ;

 
  mounted(){
    bus.store = this.$store; 

    const display:HTMLLabelElement = this.$refs.display as HTMLLabelElement;    
    display.style.color = this.color;
    display.style.fontSize = this.fontSize + "px";
    
    const background:HTMLDivElement = this.$refs.background as HTMLDivElement;
    background.style.background=this.bgcolor;
    background.style.height =  Math.round(this.fontSize*1.2) + "px"; 
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
    padding-bottom:0em;
    width:fit-content;

    
    .display {
      font-family: 'Tag';  
      padding:0.02em;
      padding-left:0.4em;
      padding-right:0.4em;
      padding-bottom:0em;      
      position:relative;
      z-index: 100;
      text-transform: uppercase;
      letter-spacing: 0.1em;
       
    }
  }
 
</style>
