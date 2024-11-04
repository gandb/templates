<template>
    <div class="upload-btn-wrapper">
      <input  :accept="accept" 
      v-on:change="handleFileUpload()" ref="fileInput" 
      @mouseleave="onMouseLeave" @mouseenter="onMouseEnter" 
      type="file" :name="name"/>
      <button @click.prevent="onClickButton" :class="buttonClasses"><i class="icon upload"></i>{{text}}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  
@Component({
  name: 'Upload', 
  components: { 
  }
} )
export default class Upload extends Vue {
  @Prop(  {required: true, type : String} ) name !: string ;
  @Prop(  {required: true, type : String} ) text !: string ;
  @Prop(  {required: false, type : String} ) accept !: string ;
  @Prop(  {required: true, type : Array} ) files : any ;
  
  buttonClasses:string="";

  mounted()
  {
    for(let file of this.files)
    {
      (this.$refs.fileInput as any).files.push(file);
    }
  }

  @Watch('files')
  onChangeFiles(value: Array<any>, oldValue: Array<any>) { 
    
    (this.$refs.fileInput as any).value = "";
  
    for(let file of this.files)
    {
      (this.$refs.fileInput as any).files.push(file);
    }
  }
   
  
  handleFileUpload()
  {
    this.$emit("input",(this.$refs.fileInput as any).files[0]);
  }

  onMouseLeave()
  {
    this.buttonClasses="";
  }

  onMouseEnter()
  {
    this.buttonClasses="st-hover";
  }
  onClickButton()
  {
  	(this.$refs.fileInput as any).click()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block; 
  }
   
  #outergame .upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor:pointer!important;
  }

  /*#outergame .button.st-hover {*/
  #outergame button.st-hover
  {
    cursor:pointer!important;
    background-color:var(--half-gray);
    color: rgba(0,0,0,.9)!important;
    -webkit-box-shadow: 0 0 0 1px rgba(8, 6, 6, 0.15) inset, 0 1px 4px 0 rgba(34,36,38,.15) inset;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15) inset, 0 1px 4px 0 rgba(34,36,38,.15) inset;
  }

  #outergame .st-mobile button i
  {
    font-size: 72px!important;
    padding-right: var(--lv4-margin);
  }
   
</style>
