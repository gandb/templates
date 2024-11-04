<template>
  <div class="t-share-campaign-content">
      <h2  class="ui header t-explore t-half-gray">Compartilhe a sua campanha</h2>
      <HR/>
      <transition name="trans-message">
      <message :type="messageType" @onClose="onCloseErrorMessage" :header="messageHeader" :content="message"/>
      </transition> 
      <div class="t-segment">
          <transition name="trans-view">
            <div v-if="lock" class="loader">
              <loader :lock="lock">
                  Aguarde enquanto preparamos um link para você distribuir o seu jogo...
              </loader>
            </div>
            <div v-else class="link-builder">
                <div class="t-content">
                  <P>Gere e compartilhe o link de sua campanha para que seus amigos possam acessar o seu jogo:</P>
                </div>
                <div class="t-link">
                    <input class="t-link-input" @click="selectAll" v-model="link" readonly value="Exemplo"/> 
                    <transition name="trans-link">
                      <i v-if="value!=''" @click="copyLink" title="copiar" alt="copiar" class="icon copy outline"/>
                    </transition>
                </div>
                <div class="t-content">
                  <P>Lembre-se : no máximo 6 jogadores serão aceitos por jogo.</P>
                </div>
                <div class="t-actions">
                  <button  @click="closeShare">Fechar</button> 
                  <button class=" t-primary" @click="buildLink"><i class="icon linkify"/> Gerar Link</button>
                </div>
            </div>
          </transition>
      </div>
       
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  import bus from "@/bus";
   import Message from '@/components/Message.vue';
  import Loader from '@/components/Loader.vue';
 

  @Component({
    name: 'Share', 
    components: { 
      Message,Loader
    }
  } )
  export default class Share extends Vue { 
    @Prop(  {required: true, type : String, default:false} ) invitationBuilder !: string ; 
    @Prop(  {required: true, type : String, default:false} ) value !: string ; 
     @Prop(  {required: true, type : String, default:false} ) cmpInviteLink !: string ;  
    lock:boolean=false; 
    message:string = "";
    link:string = "";
    messageType:string = "error";
    messageHeader:string = "Erro!";

    mounted()
    { 

       bus.store = this.$store;
      this.link = this.value;
    }

 
    sendMessage(error:boolean,message:string)
    {
      this.messageType = (error)? "error":"success";
      this.messageHeader = (error)? "Error!":"Success!";
      this.message=message;
    }

    closeShare()
    { 
      this.$emit("closeShare");
    }

    copyLink()
    {
      const input:HTMLInputElement =(document.getElementsByClassName("t-link-input")[0] as HTMLInputElement);
      input.select();
      document.execCommand('copy');
      this.sendMessage(false,"Link copiado com sucesso!");
    }

    onCloseErrorMessage()
    {
      this.message ="";
    }

    onCloseSuccessMessage()
    {
      this.message ="";
    }

    selectAll(event:Event)
    {
      if( event.target==null)
      {
        console.error("selectAll event target null");
        return;
      }
      const input:HTMLInputElement =  (event.target as HTMLInputElement);

      input.select();
    }

    buildLink()
    {
      this.lock=true;  
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss"> 
  
    /** Inicio das transicoes */
  .trans-link-enter-active, .trans-link-leave-active { /**flip card*/
    transition: transform 0.8s ;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
  .trans-link-enter, .trans-link-leave-to {
    transform: rotateY(180deg);
  } 
  .trans-message-enter-active, .trans-message-leave-active ,
  .trans-view-enter-active, .trans-view-leave-active ,
  .trans-success-enter-active, .trans-success-leave-active {
    transition: opacity .5s;
  }
  .trans-success-enter, .trans-success-leave-to ,
  .trans-view-enter, .trans-view-leave-to ,
  .trans-success-enter, .trans-success-leave-to {
    opacity: 0;
  } 
   
  /** Fim das transicoes */

  #outergame 
  {

    .t-share-campaign-content
    {

      .st-mobile 
      {

         .t-segment
        {
          height:650px;
        }


         .t-link  
        {
            margin-top: var(--lv4-margin);
          margin-bottom: var(--lv4-margin);
        }

         .t-link input
        {
            font-size: var(--max-mobile-font-hidden-size);
        }

         .t-actions 
        {
            margin-top: var(--lv4-margin);
            
             button:first-child
            {
              left:var(--lv4-negative-margin);
            }

             button:last-child
            {
              right:var(--lv4-negative-margin);
            }
        }
       

      }
      h2
      {
        text-align: center;
      }
      .t-segment
      {
        padding-left: var(--lv5-margin);
        padding-right: var(--lv5-margin);
        padding-top:var(--lv3-margin); 
        height:250px;

         .t-content
        {  
          text-align: center;
        }

      }


   

      .t-link  
      {
        margin-top: var(--lv2-margin);
        margin-bottom: var(--lv2-margin);
        text-align: center;
        .t-link
        {
          cursor:pointer;
          margin-left: var(--lv0-margin);
        }

        input
        {
            height:2em;
            width: 80%;
            padding-left: 0.5em;
            background-color: beige;
            text-align: center;
            font-size: var(--max-font-hidden-size);
            border-radius: 5px;
            border-color: lightblue;
        } 
      } 
      
      .t-actions 
      {
        position: relative;
        display: block;
        background-color: red; 
        margin-left:auto;
        margin-right:auto;
        margin-top: var(--lv2-margin);
        width:600px;
          
         button
        {
          display: inline;
          position: absolute;
        }

         button:first-child
        {
          left:var(--lv4-margin);
        }

         button:last-child
        {
          right:var(--lv4-margin);
        }
      

      } 
    }
  }


</style>
