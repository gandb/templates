<template>
  <div class="container">
    <div class="led-box">
      <div ref="ledContent" class="led-content"></div>
    </div>
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
  name: 'Led', 
  components: { 
  }
} )
export default class Led extends Vue { 

  @Prop(  {required: false, type : String,default:"green"} ) color !: string ;
  @Prop(  {required: false, type : Boolean,default:true} ) blink !: boolean ;
  @Prop(  {required: false, type : Boolean,default:true} ) on !: boolean ;
  @Prop(  {required: true, type : Number} ) size !: number;
    
  ENABLED_COLORS:string = "green-blue-red-yellow-orange";
 
  mounted(){



    bus.store = this.$store; 

    const ledContent:HTMLDivElement = this.$refs.ledContent as HTMLDivElement;

    const colorFixed:string = this.color.toLowerCase();

    if(this.ENABLED_COLORS.indexOf(this.color) == -1 )
    {
      throw new Error(`Color ${this.color} isnt accept. Try blue, yellow, red or green`);
    }


    ledContent.classList.add(`led-${colorFixed}`); 
    ledContent.style.width = this.size + "px";
    ledContent.style.height = this.size + "px";

    if(this.on)
    {
      if(this.blink)
      {
        ledContent.classList.add(`anime-${colorFixed}-blink`); 
      }
    }
    else{
      ledContent.classList.add(`off-${colorFixed}`); 
    }
    
  }
 

  @Watch("enabled")  @Watch("width")  @Watch("height")
  onChangeCommon(after:boolean )
  { 
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 
  .led-box {
    height: 30px;
    margin: 10px 0;
    float: left;
    .led-content{
      margin: 0 auto;
      border-radius: 50%;
    }
    p {
      font-size: 12px;
      text-align: center;
      margin: 1em;
  }
  }

  

    
  .led-green.off-green
  {
    background-color: #070;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #15310e 0 -1px 9px, rgba(0, 255, 0, 0.2) 0 2px 12px;
  }
   
  .led-red.off-red
  {
    background-color: #700;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #310e0e 0 -1px 9px, rgba(255, 0, 0, 0.2) 0 2px 12px;
  }
  
  .led-blue.off-blue
  {
    background-color: #007;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #0e1331 0 -1px 9px, rgba(0, 0, 255, 0.2) 0 2px 12px;
  }

  
  .led-yellow.off-yellow
  {
    background-color: #770;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #30310e 0 -1px 9px, rgba(255, 255, 0, 0.2) 0 2px 12px;
  }

  .led-orange.off-orange
  {
    background-color: #970;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #312b0e 0 -1px 9px, rgba(255, 128, 0, 0.2) 0 2px 12px;
  }

  .anime-orange-blink
  {    
    animation: blinkOrange 3s infinite;
  }
   @keyframes blinkOrange {
      from { background-color: #FB0; }
      50% { background-color: #A70; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #443713 0 -1px 9px, rgba(255, 128, 0, 0.5) 0 2px 0;}
      to { background-color: #FB0; }
  }

  .anime-red-blink
  {    
    animation: blinkRed 3s infinite;
  }
   @keyframes blinkRed {
      from { background-color: #F00; }
      50% { background-color: #C00; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #963636 0 -1px 9px, rgba(255, 0, 0, 0.7) 0 2px 0;}
      to { background-color: #F00; }
  }

  
  .anime-green-blink
  {
    animation: blinkGreen 3s infinite;
  }

  @keyframes blinkGreen {
      from { background-color: #0F0; }
      50% { background-color: #0C0; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #35962c 0 -1px 9px, rgba(0, 255, 0, 0.7) 0 2px 0;}
      to { background-color: #0F0; }
  }

   
  .anime-blue-blink
  {
    animation: blinkBlue 3s infinite;
  }

  @keyframes blinkBlue {
      from { background-color: #24E0FF; }
      50% { background-color: #24A0AF; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #2d759e 0 -1px 9px, rgba(128, 128, 255, 0.7) 0 2px 0;}
      to { background-color: #24E0FF; }
  }

.anime-yellow-blink
  {
    animation: blinkYellow 3s infinite;
  }

  @keyframes blinkYellow {
      from { background-color: #FF0; }
      50% { background-color: #CC0; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #9ea02b 0 -1px 9px, rgba(255, 255, 0, 0.7) 0 2px 0;}
      to { background-color: #FF0; }
  }


  .led-red {
    background-color: #F00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;    
  } 
 

  .led-yellow {
    background-color: #FF0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 12px;
  }

  
  .led-orange {
    background-color: #FA0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #806302 0 -1px 9px, #FA0 0 2px 12px;
  }

  .led-green {
    background-color: #ABFF00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px;
  }

  .led-blue {    
    background-color: #24E0FF;    
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #006 0 -1px 9px, #3F8CFF 0 2px 14px;
  }
 
</style>
