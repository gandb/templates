<template>
      <div class="t-profile" :class="classes">
          <message @onClose="onCloseErrorMessage" header="Erro!" :content="errorMessage"/>
           <message @onClose="onCloseSuccessMessage" type="success" header="Sucesso!" :content="successMessage"/>
           <round-button class="add" alt="criar alerta" @click="addNewAlert" source="i:/plus.png"/>
           <round-button class="list" alt="listar alertas" @click="listAlerts" source="i:/list.png"/>
            <painel class="painel"/>
      </div>
    
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'; 
  import bus from "@/bus"; 

  import RoundButton from '@/components/RoundButton.vue';
  import Share from '@/components/local/home/Share.vue';
  import Message from '@/components/Message.vue';
  import {default as Painel} from "@/components/alarm/Painel.vue";
  import { Route } from 'vue-router';
 
  
//exemplo de import de componentes de 3os 
//const VueAgile = require('vue-agile');

    @Component({name: 'Profile', 
		components: {
			 Painel ,RoundButton,Message,Share
    },
       
  } )
    
   
  export default class Profile extends Vue { 
     MODES = {
      PROFILE:1,
      ADD_CAMPAIGN:2,
      SHARE:3,
      EDIT_CAMPAIGN:4
    };

    editForm:any = {id:null,name:null,description:null,imageSrc:null,editURL:null,removeURL:null};
    
    logged:boolean = false;
    
    mode:number= this.MODES.PROFILE;
    classes:string = ""; 

    successMessage:string = "";
    errorMessage:string = "";

    showMyCampaigns:boolean = false;
    
    alreadyCreated:number=0;
    accesslevel:number=0;
    maxGM:number=0;

    invitationBuilder:string="";
    invite:string="";

    shareCampaign : any ;

    placeholder=true;

    cmpInviteLink:string = "";
 

    campaigns : any = {
      my: [],
      recents : []
    }; 
   
    mounted()
    {
      bus.store = this.$store;

      this.logged =  this.$store.state.user.logged;
      bus.onUpdateLoginStatus((data:any)=>{
        this.logged =  data.success;
      }); 
 
      const alreadyLoaded = this.$store.state.user.data &&  this.$store.state.user.data.allcampaigns;

      if(alreadyLoaded) 
      {
        this.loadUserInformation( this.$store.state.user.data);
      }
      else
      {
        bus.onLoadUserInformation((userInfo:any)=>this.loadUserInformation(userInfo));
      }
 
    } 

 
 
    pad  (n:string, width:number):string  { 
      return n.length >= width ? n :  
        new Array(width - n.length + 1).join('0') + n; 
    }


    parseDate   (date:Date)  {
      const year:string=  date.getFullYear().toString();
      const month:string= this.pad((date.getMonth()+1).toString(),2);
      const day:string= this.pad( (date.getDate()).toString(),2);

      return `Último jogo em ${day}-${month}-${year}`;
    }

    listAlerts(){
      console.log("listar alertas");
      this.$router.push("Alerts");
    }

    onCreateNewGame (data:any){
     
        const url:string = data.link; 
        
        //wait be created
        const intervalID:number =  window.setInterval( ()=>{
        bus.api.get(url)
        .then(  (response:any) => {
            const campaign =  response.data;
             
            const ownerURL:string = campaign.owners[0];
            campaign.owners[0] = this.$store.state.user ;
            window.clearInterval(intervalID);

            this.alreadyCreated++;

            campaign.owner = this.$store.state.user.name;

            campaign.playersCount = campaign.members.length + 1;
            campaign.lastDate = this.parseDate(new Date());
            this.campaigns.my.unshift(campaign);
            this.campaigns.recents.unshift(campaign); 
          })
          .catch(  (error:Error) => {
            // handle error //maybe fine
            console.error("onCreateNewGame error",error);  

          });
        },bus.INTERVAL_MID_PRIORITY);
      }

   loadUserInformation(userInfo:any)
      {
          this.alreadyCreated = (userInfo.campaignsiown.contents)?userInfo.campaignsiown.contents.length:0;

        this.accesslevel = userInfo.accesslevel;
        this.maxGM= userInfo.maxGM;
       
        const sortLastFirst = (a:any,b:any):number=>{ 
          if(a.naturalLastDate > b.naturalLastDate)
          { 
            return -1;
          }
          return 1;
        };

        const updateView = (url:string, campsData:any ,type:string)=>{ 
          if(url===undefined)
          {
            console.error("updateView",url,campsData);
          }
 

        bus.api.get(url)
          .then(  (response:any) => {
                let camps = response.data;  
                campsData.length=0; 
                for(let campaign of camps)
                {
                  campaign.playersCount = campaign.members.length + 1;
                  campaign.owner = campaign.owners[0].name;
                  
                  const date : Date = new Date(campaign.lastAccess);
                  campaign.lastDate = this.parseDate(date);
                  campaign.naturalLastDate = date; 
                  campsData.push(campaign);
                }

                campsData.sort(sortLastFirst);

                this.placeholder = false;
             })
          .catch(  (error:Error) => { 
            console.error("updateView error",error); 
            throw error;

          });
        };
        const campaignsRecentsURL = userInfo.allcampaigns.self;
        updateView(campaignsRecentsURL,this.campaigns.recents,"recentes"); 
       
        const campaignsIOwnURL = userInfo.campaignsiown.self;
        updateView(campaignsIOwnURL,this.campaigns.my,"my");
       
      }

    onRequestEditCampaign(campaign:any)
    {
        this.mode=this.MODES.EDIT_CAMPAIGN;
        this.editForm.name = campaign.name;
        this.editForm.description = campaign.description;
        this.editForm.id = campaign.id;
        this.editForm.imageSrc = campaign.image;
        this.editForm.removeURL =  '/campaign/' + campaign.id;
        this.editForm.editURL =  '/campaign/' + campaign.id;
    }

    onCloseErrorMessage()
    {
         this.errorMessage="";
    }


    onCloseSuccessMessage()
    {
         this.successMessage=""; 
    }
    
    onRemoveGame(gameid:string)
    {
      this.mode=this.MODES.PROFILE;
 
      const filter = (campaign:any,index:number,arr:Array<any>)=>campaign.id !== gameid;

      this.campaigns.my = this.campaigns.my.filter(filter);
      this.campaigns.recents = this.campaigns.recents.filter(filter);

      this.alreadyCreated--;

      bus.moveToUP();
 
    }

    onCloseSubScreen()
    {
      this.mode=this.MODES.PROFILE;
    }
     

    addNewAlert()
    { 
      console.log("add alerta");
      this.$router.push("Alert");
    }

    onShare(campaign:any)
    { 
       this.shareCampaign = campaign;
       this.invitationBuilder=campaign.invitation;
       this.cmpInviteLink = bus.frontendHostname + "/campaign/" + campaign.id + "/invite/" ;
       const link : string =  this.cmpInviteLink + campaign.invite ;
       this.invite=(campaign.invite)?link:"";
       this.mode=this.MODES.SHARE;
       this.cmpInviteLink = campaign.self;
    }

    @Watch("invite")
    onChangeInvite(newValue:any,oldValue:any)
    {
      this.shareCampaign.inviteLink = newValue.link;
      this.shareCampaign.invite = newValue.invite;
    }

    calcMaxGames():number
    {
        if(this.$store.getters.deviceMbile)
        {
          return 2;
        }
        
        return 3;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


/** Inicio das transicoes */
.trans-profile-enter-active, .trans-profile-leave-active {
  transition: opacity .5s;
}
.trans-profile-enter, .trans-profile-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}

.trans-add-campaign-enter-active, .trans-add-campaign-leave-active {
  transition: opacity .5s;
}
.trans-add-campaign-enter, .trans-add-campaign-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
/** Fim das transicoes */



@keyframes onHover {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

 
 @keyframes goAway {
    from {  
       width: 100%;
       height:100%;
       opacity: 1;
    }
    to { 
        width: 0px;
        height:0px;
        opacity: 0;
    }
  } 



#outergame 
{
  .st-mobile 
  {
    .add{
      display:none;
    }
    .t-profile 
    {
      .t-new-game-button
      {
        display:block;
        margin-top:40px;
        margin-bottom:40px;
      }
    }
  }

  .t-new-game-button
  {
    display:none;
    margin-top:40px;
    margin-bottom:40px;
  }

  .t-profile
  {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
      "left content right"
  }

  .painel{
    grid-area: content;
  }
}



.add
{
  position: fixed;
  bottom: 60px;
  right:0px; 
  z-index: var(--znormal-lv1);

  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  border-radius: 40px;
}

.list
{
  position: fixed;
  bottom: 60px;
  right:100px; 
  z-index: var(--znormal-lv1);

  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  border-radius: 40px;
}

.t-round-button
{ 
  cursor:pointer;
}
.t-round-button:hover
{
  animation-name: onHover;
  animation-duration: 1s;
}

.t-explore
{ 
  text-align: center;
}

.t-profile
{
  display: inline;
}

  .t-profile.st-loaded.t-mode-add-campaign .t-profile-main
  {
    display: none;
  }

  .t-mode-add-campaign
  {
    .t-profile-main{ 
      
      -webkit-animation-animation-name: goAway;
        animation-name: goAway;
        -webkit-animation-animation-duration: 0.3s;
        animation-duration: 0.3s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards; 
      
    }
    .t-add-campaign
    {
        display: inline;
    }
  }

</style> 