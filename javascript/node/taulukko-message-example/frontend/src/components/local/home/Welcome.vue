<template>
      <div class="t-welcome">
        <div class="">

          <div class="first-page-content t-screen-main">
            <div class="t-what-is">
                <img class="t-what-is-img" src="@/assets/images/welcome-ex1.png" alt="tela de exemplo do alarme"/>
            </div> 

            <div  class="t-short-desc">
              <H2>Great Scott!</H2>
              <div class="sub">V-alarm seu alarme na internet:</div>
              <img class="t-motivacional" src="@/assets/images/logo.png">
            </div>
          </div>
          <!--id para conseguir vencer o ui semantic -->
          <div id="t-pricing001" class="t-pricing">
            <div class="t-content">
              <h2 class="ui center aligned header"> Planos
                <div class="sub header">Mais barato que plutônio</div>
              </h2>

              <div class="t-plans ui segment">
                 <div class="ui two column very relaxed grid">
                  <div class="ui column center aligned">
                    <div class="t-plan-content">
                      
                      <H3 class="ui header">Iniciante </h3> 
                        <div class="t-plan-price ui statistic">
                        <div class="t-value">
                          R$ 0
                        </div> 
                        </div>

                        <div class="t-plan-content-body">
                          <p>Acesso de jogador para até 10 jogos (com convite).</p>
                          <p>Por 30 dias pode jogar como mestre até 5 jogos.</p>
                          <!--p>Pode criar conteúdo público.</p-->
                        </div>

                      <button class="t-green t-colored" @click="selectFree"> Selecionar  </button>

                    </div>
                  </div>
                  <div class="ui column center aligned">
                    <H3 class="ui header">Aventureiro </h3>
                      <div class="t-plan-price ui statistic">
                        <div class="t-value">
                          R$ 5
                        </div>
                        <div class="label">
                          por mês
                        </div>
                    </div>
                    <div class="t-plan-content-body">
                        <p>Acesso ilimitado a todos os jogos (com convite).</p>
                        <p>Pode jogar como mestre até 30 jogos.</p>
                        <p>Conteúdo exclusivo.</p>
                        <!--p>Pode criar conteúdo pago.</p-->
                    </div>

                    <button class="t-green t-colored"  @click="selectAdventure"> Selecionar   </button>
                  </div>
                </div>
                <div class="ui vertical divider">
                  OU
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'; 
  import bus from "@/bus"; 
  import UserStatus from "@/UserStatus";

  @Component
  export default class Welcome extends Vue { 
    mounted(){
       bus.store = this.$store;
    }
		selectAdventure()
		{
			window.location.href = "/plan01";
		}
		selectFree()
		{ 
      bus.emitOnRequesLoginModal();
    }
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  /** GERAL */

  /* Algum CSS do Semantic esta intervindo */
  

  #outergame 
  {
    .t-motivacional  
    {
      margin-top: 1em;
      margin-left: -1em;
      width: 25vw;
    }

    .t-welcome
    {
      padding:20px;    
      .first-page-content
      {
         display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 0px 0px;
        grid-template-areas:
          "pl left right pr";

        .t-what-is
        {
          width: 55vw;
          min-width: 350px; 
          margin-right: 2em;
          min-height:68vh ;
          grid-area: left;
          .t-what-is-img
          {
            width:50vw;
            height:25vh;
          }
        }
        .t-short-desc{
          grid-area: right;
        }
      }
    
    }
  } 

 

  .t-plans
  {
    margin-top: 4em;
    margin-bottom: 1em;
  } 
/** MOBILE */


  #outergame 
  {

    .st-mobile 
    {
      .first-page-content
      {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 2fr;
        grid-template-areas: 
          "pl left left  pr"
          "pl right right  pr" ;

        .t-what-is
        {
          width:100%;
          min-width: 350px; 
          margin: 0px;
          min-height:25vh ;
          grid-area: left;
          .t-what-is-img
          {
            width:100%;
            height:25vh;
          }
        }
        .t-short-desc{
          grid-area: right;
        }

      }

      
      .t-pricing
      {
        margin-top:5em;
         width: auto;
      }
     

      .t-what-is-taulukko
      {
          width: 80vmax;
          height: 40vmax;
          margin-right: 5vw; 
          margin-left: 5vw;
      }

      .t-short-desc 
	    {
        width:100%;
        margin: 0px;
      }
   
      .t-short-desc h2
      {
          margin-left:var(--lv3-margin);
      }

      .t-short-desc img
      {
          width:100%;
      }

  

       .t-plan-price .label
      {
        padding-top: 10px;
      }

      .t-plan-content-body
      {
        padding:40px; 
        height: 600px;  
      }

      .t-plan-content-body *
      {
        font-size: var(  --lv1-mobile-font-size);
      }
   
      .t-what-is-taulukko
      {
          width: 120vw;
          height: 40vh;
          min-height:200px;
      }
    }
}
   

  #outergame  .t-plans button
  {
        margin-top: var(--lv3-half-negative-margin);
        margin-left: var(--lv4-margin);
  }
  
   
.t-pricing
{
  width: 40em;
  margin-left: auto;
  margin-right: auto;
}
 


  .t-plan-price
  { 
    height: 80px;
  }


  .t-plan-content-body
  {
    height: 200px;
  }
 
</style>
