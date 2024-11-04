<template>
	<div class="content"> 
		<H1>Alertas</H1>

		<TABLE class="ui celled table">
			<thead>
				<TR>
					<th>Nome</th>
					<th>Horário</th>
					<th>Habilitado</th>
					<th></th>
				</TR>
			</thead>
			<TBODY>
				<tr v-for="(alert) in alerts" v-bind:key="alert.id">
					<TD >{{alert.name}}</TD>
					<TD>{{getTime(alert.time)}}</TD>
					<TD>{{getEnabled(alert.enabled)}}</TD>
					<TD class="action">
						<button title="configurar" class="circular ui icon button" @click="onEdit(alert.id)"><i class="icon settings"></i></button>
						<button title="remover" class="circular ui icon button" @click="onRemove(alert.id)"> <i class="icon trash"></i></button>
					</TD>
				</tr> 
			</TBODY>
			
		</TABLE>
		<button @click="teste">testar notificação</button>
		<round-button class="add" alt="criar alerta" @click="addNewAlert" source="i:/plus.png"/>
	</div>
</template>


<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator';
	import Layout from '@/components/Layout.vue';
	import RoundButton from '@/components/RoundButton.vue'; 
	import bus from "@/bus";
	import fluxcapacitor from "@/fluxcapacitor";
	import { stringUtils } from '@/libs/common';
	
	

   @Component({name: 'Alerts', 
		components: {
			RoundButton
		}
	  } )

	export default class Alerts extends Vue {

		logged:boolean = false;
		alerts = new Array();
		 

		mounted()
		{ 

       		bus.store = this.$store;
			this.logged = this.$store.state.user.logged;
			bus.onUpdateLoginStatus((data:any)=>{
					this.logged =  data.success;
			}); 

			this.updateList(); 
			
		}

		async teste()
		{
			fluxcapacitor.notifySystem(null);

		} 
 

		async updateList()
		{
			const endpoint : string = this.$store.getters.backendHostname + "/alert/list";
			const response  = await bus.api.post(endpoint);
			console.log("retornou com nova lista");
			this.alerts = response.data.data;		
			console.log("lista antiga atualziada");
		}

		async onRemove(id:string)
		{
			await this.$store.dispatch("alert/removeAlert",id);			
			
			this.alerts = this.alerts.filter((v)=>{ return v.id!=id;});
		}

		async onEdit(id:string)
		{

			const alert = this.alerts.filter((alert)=>{return alert.id==id})[0];

			await this.$store.dispatch("alert/openEdit",alert);
		}

	
		addNewAlert()
		{ 
			this.$router.push("Alert");
		}

		
		getTime(time:number):string
		{
			
			const hour:string  =  stringUtils.right("00" + Math.floor(time / 100),2 );
			const minutes:string  =  stringUtils.right("00" + Math.floor(time % 100),2 );

			return  hour + ":"+ minutes;
		}

		getEnabled(enabled:boolean):string
		{
			return (enabled)?"Sim":"Não";
		}
		
	}
</script>

<style scoped lang="scss">
	
#outergame{
	.content 
	{
		margin:40px;
		margin-top: 5px;
		table{
			width:95%;
			tr{
				th,td{
					text-align: center;
				}
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

		.action
		{
			*{
				display: inline-block;
			}
		}
	}
}

</style>
