<template>
  <div class="t-plan01">
     
    <div class="t-plan01-containner fx-containner-default fx-type-0 fx-space-between">
      <div id="t-content001" class="fx-item t-content  ">
        
        <h2>
          Plano Aventureiro
          <div class="sub">Uma grande aventura começa com o primeiro passo...</div>
        </h2>
        <div>
            <P class="t-temporary-while-few-subscripters">O Taulukko Volume 2 é um projeto nacional, que nasceu em 2020 com base no antigo projeto Taulukko Legacy .</P>
            <P class="t-temporary-while-few-subscripters">E você será um dos primeiros a assinar e 
              participar do crescimento deste projeto!</p>
            <P>Você escolheu o plano Aventureiro e com R$5,00 mensais você irá ajudar o Taulukko a manter os servidores, além de ganhar os benefícios abaixo:</P>
            <UL class="ui list">
                <li   class="item">Acesso ilimitado a jogos ( com convite do mestre é claro ).</li>
                <li class="item">Pode jogar como mestre até 30 jogos.</li>
                <li class="item">Conteúdo exclusivo.</li>
                <li class="item">Além de contribuir com o mercado de RPG nacional.</li>
            </UL> 
            <P>Para finalizar, iremos direcionar você para o site do <a href="https://www.catarse.me/taulukkoVol2">Catarse</a> onde nosso plano de assinaturas está hospedado e assim você poderá assinar o Taulukko.</P>
            <button  @click="goToCatarse" class="t-button t-positive t-colored"  >Ir para o site do Catarse</button>
        
        </div>   
      </div>
      <div class="fx-item t-catarse">

        <div class="ui black ribbon label">
          <i class="info icon"></i> Catarse
        </div>
        <img alt="imagem do site do catarse com o botão Assinar este projeto em evidência." src="../assets/images/catarse.png?v=1">
        <P>No site do catarse, clique em <strong>Assinar este projeto</strong></P>
      </div>
    </div>
  </div>
</template>


<style scoped>
@media only screen and  (orientation:portrait){
   
  /*Mobile Orientação Retrato*/
  #outergame #t-content001
  {
    width: 80%;
    padding-left:40px;
    margin-bottom: 40px;
  }
  #outergame .t-catarse
  {
    margin-left:40px;
    margin-top:40px;
  }
  
  #outergame .t-content h2
  {
    margin-bottom: 60px;
  } 

   
}
 
 
#outergame .t-catarse img
{ 
  width: 500px;
  margin-top: var(--lv3-half-negative-margin);
} 

#outergame .st-mobile  .t-catarse img
{ 
  margin-top: var(--lv3-half-negative-margin);
  width: 100%;
} 

.t-plan01
{
  padding-right: 40px;
}
.t-content
{ 
  padding-left:40px; 
  padding-right: 40px;
}

#outergame .t-content  li
{
  padding-left: 20px;
}

.st-mobile .t-plan01 button
{
  width: 100%;
}

</style>

<script lang="ts">
    import { Component, Vue,Prop,Watch } from 'vue-property-decorator';
    import HeaderMenu from '@/components/HeaderMenu.vue'

    import UserStatus from "@/UserStatus";
   import bus from "@/bus"; 
   @Component({name: 'Plan01', 
		components: {
			HeaderMenu
		}
	  } )
    export default class Plan01 extends Vue { 

      mounted()
      {

       bus.store = this.$store;
              bus.onUpdateLoginStatus((data:UserStatus)=>{ 
                console.log("onUpdateLoginStatus=>",data);
                  if( data.success)
                  {
                    this.$router.push("/");
                  }              
          }); 
      }

    	goToCatarse(){ 
    		window.location.href = "https://www.catarse.me/taulukkoVol2"; 
    	}
    }
</script>