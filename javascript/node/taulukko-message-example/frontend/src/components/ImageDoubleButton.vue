<template>
  <div class="t-image-double-button">
      <a class="t-link" @click="onClickLink">{{text}}</a> 
      <i v-if="icon" class="t-button-icon circle icon t-max-font-size" 
      :class="color+ ' ' +image "
      @click="onClickImage"></i>
      <img v-if="!icon" class="t-image ui mini circular image" :src="image">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  
@Component({
  name: 'ImageDoubleButton', 
  components: { 
  }
} )
export default class ImageDoubleButton extends Vue {
   @Prop(  {required: true, type : String} ) text !: string ;
   @Prop(  {required: true, type : String} ) color !: string ;
   @Prop(  {required: true, type : String} ) image !: string ;
   @Prop(  {required: false, type : Boolean, default:true} ) icon !: boolean ;
      
    onClickLink()
    {
      this.$emit("onClickLink");
    }

    onClickImage()
    {
      this.$emit("onClickImage");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  .t-image-double-button
  { 
      display: inline;
  }

  .t-link
  {
    display:inline-block;
    padding-bottom: var(--lv2-margin);
    padding-top: var(--lv2-margin);
    padding-left: var(--lv1-margin);
    vertical-align: text-bottom;
    cursor: pointer;
  }

  .t-button-icon
  { 
    vertical-align: super;
  }

  #outergame .st-mobile .t-button-icon
  {  
    font-size: 68px;
    padding-top:4px;
  }

  #outergame .t-image
  {
    display: inline-block;
    margin-left: var(--lv1-margin);
    vertical-align: baseline;
    width: 48px;
    height:48px;
  }


  #outergame .st-mobile .t-image
  { 
    width: 72px;
    height:72px;
  }
 
</style>
