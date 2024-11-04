<template>
  <div class="display-labeled-container-main">
    <div class="display-group">
        <div class="display-title">
            <Tag :fontSize="18" :value="name"></Tag>
        </div>
        <div class="display-content">
          <slot/>
        </div>
    </div>      
  </div>
</template> 
<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
import {default as Tag} from "@/components/alarm/Tag.vue"; 
import bus from "@/bus"; 

 
 
@Component({
  name: 'DisplayLabeled', 
  components: { Tag
  }
} )
export default class DisplayLabeled extends Vue { 

@Prop(  {required: false, type : String,default:""} ) name !: string ;
 
  mounted(){
    bus.store = this.$store; 
 
  }
 

  @Watch("enabled")  @Watch("width")  @Watch("height")
  onChangeCommon(after:boolean )
  { 
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .display-group{
        
        width: fit-content;
        padding-left: 10px;
        padding-right: 10px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 2fr;
        gap: 0px 0px;
        grid-template-areas:
        "title" 
        "content";
        align-items: center;

      }

      .display-title
      {
        grid-area: title;        
        align-self: center;
        justify-self: center;
        padding-bottom: 0.5em;
      }

      
      .display-content
      {
        grid-area: content;
        background-color: black;
        padding-left: 10px;
        padding-right: 10px;
      }


       .display-content > *
      {        
        display: inline-block;
      } 

      
 
</style>
