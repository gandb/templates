<template>
    <div class="t-content">
           
      <div class="testa">
        <P>Teste a</P>
        <div class="testb">
          <P>Teste b</P>
        </div>

        <h6>teste</h6>
      </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus"; 

@Component({
  name: 'Sass', 
  components: {  
  }
} )
export default class Sass extends Vue {
     
      mounted(){

       bus.store = this.$store;
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"> 
    @import "../../../assets/3thparty/semantic-ui/semantic.min.css"; 
    @import "@/assets/css/headers"; 
  

    @mixin arredondado($size:5px)
    {
      border-radius: $size;
    }
 
    .testa
    {
        .testb
        {
            p
            {
              background-color: greenyellow;
              @include arredondado(10px);
              height: 200px;
            }
        }

        p
            {
              background-color: red;
              @include arredondado(20px);
              height: 100px;
            }
    } 

  .t-content
  {
    margin: 10px;
    margin-left: 20px;
  }
</style>
