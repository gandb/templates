<template>
  <div class="container-main-ampm">
    <div ref="containeram" class="container-ampm container-am">
      <Tag  class="tag" :fontSize="size" value="AM"></Tag>      
      <Led ref="ledAM" class="led" :color="color" :on="onAM" :size="ledSize"/>
    </div>
    <div ref="containerpm" class="container-ampm container-pm">
      <Tag  class="tag" :fontSize="size" value="PM"></Tag>
      <Led ref="ledPM" class="led" :color="color" :on="onPM" :size="ledSize"/>
    </div>
  </div>
</template> 
<script lang="ts">
  import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  import {StateVuexTaulukko} from '@/store/types';
  import bus from "@/bus"; 
  import {default as Tag} from "@/components/alarm/Tag.vue";
  import {default as Led} from "@/components/alarm/Led.vue";

  export interface ButtonMouseEvent
  { 
        event:MouseEvent;
        id:string; 
  }
  
  @Component({
    name: 'AMPM', 
    components: { Tag,Led
    }
  } )
export default class AMPM extends Vue { 
  
  @Prop(  {required: false, type : String,default:"green"} ) color !: string ;
  @Prop(  {required: true, type : Number} ) size !: number;
  @Prop(  {required: true, type : Number} ) hour !: number;

 
  mounted(){
    bus.store = this.$store;
    
    const ledAM:HTMLElement = (this.$refs.ledAM as Vue).$el as HTMLElement;
    ledAM.style.marginLeft = ledAM.style.marginRight = Math.round(this.size/1.8) + "px";

    const ledPM:HTMLElement = (this.$refs.ledPM as Vue).$el as HTMLElement;
    ledPM.style.marginLeft = ledPM.style.marginRight = Math.round(this.size/1.8) + "px";

    const containeram:HTMLElement = this.$refs.containeram as  HTMLElement;
    containeram.style.height = Math.round(this.size*2) + "px";

    const containerpm:HTMLElement = this.$refs.containerpm as HTMLElement;
    containerpm.style.height = Math.round(this.size*2) + "px";
    containerpm.style.marginTop  = Math.round(this.size/2) + "px";


  }

  get ledSize():Number
  {
    return Math.round(this.size/6*5);
  }

  get onAM():boolean
  {
    return this.hour <= 12;
  }
  
  get onPM():boolean
  {
    return this.hour > 12;
  }
 

  @Watch("enabled")  @Watch("width")  @Watch("height")
  onChangeCommon(after:boolean )
  { 
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-main-ampm{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      "am"
      "pm";

  .container-am{
    grid-area: am;
  }
  .container-pm{
    grid-area: pm;    
  }
  .container-ampm
  {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      "head"
      "led";
      .tag{
        grid-area: head;
      }
      .led{
          grid-area: led; 
      }
  }
}
  
</style>
