/*

Função: corrigir thumbnails para módulos de aventuras:

Este script precisa ser rodado uma única vez no módulo pra ajustar os mapas. Depois disso somente se for criado novos mapas. Por este motivo  ele não precisa ficar pra sempre na inicialização do módulo.

1-) Crie um mundo com a sua aventura e importe a aventura.

2-) Anote o nome dos mapas com problemas
	2.1-) Se tiver mapas com nomes repetidos, altere os nomes  para algo como <ANTIGO NOME>_01 e <ANTIGO NOME>_Mapa)_02 pra poder usar no mapa dos passos seguintes.
3-) Gere os thumbnnails para os mapas em seu mundo (clique com o botão direito pra ver esta opção).

4-) Copie os thumbnails pra dentro do módulo no caminho modules/<nome do seu modulo>/assets/areas/

5-) Opcionalmente pode renomear o nome dos thumbnails mas o nome novo deve ser o usado no mapa de configuração das etapas seguintes.

6-) Desligue o foundry.

7-) Ligue o script no seu mundo : 
	3.1-) Crie a pasta scripts dentro do seu mundo
	3.2-) Copie este script pra lá
	3.3-) Adicione no world.json o script:

	 "scripts": [
    "./scripts/thumbnail-fix.js"
	],
8-)	Ajuste neste script o mapa de configuração de cenários com problemas como no exemplo abaixo:

	
const THUMB_NAME_MAP =  = new Map([
  ["Laboratório", 'laboratorio.webp'],
  ['Main', 'main.webp'],
  ["O Beco Curto", 'beco-curto.webp'],
  ["White Capel 1888", 'white-capel-1888.webp'],
  ["White Capel 2024", 'white-capel-2024.webp'],
  ["Laboratório 2024", 'laboratorio-2024.webp'], 
  ["Windrush Square", 'windrush-square.webp'],
  ["Laboratório 1877", 'laboratorio-1877.webp'],
  ["Laboratório Depois de 2024", 'laboratorio-after-2024.webp'], 
  ["O Laboratório Antes de 2024", 'laboratorio-before-2024.webp']
  ]);
  
  Onde o primeiro é o nome, o segundo o arquivo.
  
  Obs: Tem um script chamado listarNomeMapas.js que ele gera esta constante, embora os nomes dos arquivos devem ser alterados na hora que você mover pra pasta destino.
   
9-) E por último, altere o nome da constante MODULE_NAME para o nome do seu módulo.
  
  Abra um cenário com os mapas, atualize os mapas no módulo e eles passarão a apontar para o caminho correto.
  
  
*/
const MODULE_NAME = "after-time-fate";
const THUMB_NAME_MAP =  = new Map([
  ["Laboratório", 'laboratorio.webp'],
  ['Main', 'main.webp'],
  ["O Beco Curto", 'beco-curto.webp'],
  ["White Capel 1888", 'white-capel-1888.webp'],
  ["White Capel 2024", 'white-capel-2024.webp'],
  ["Laboratório 2024", 'laboratorio-2024.webp'], 
  ["Windrush Square", 'windrush-square.webp'],
  ["Laboratório 1877", 'laboratorio-1877.webp'],
  ["Laboratório Depois de 2024", 'laboratorio-after-2024.webp'], 
  ["O Laboratório Antes de 2024", 'laboratorio-before-2024.webp']
  ]);
  
(async () => {
    console.log("Generating scenes thumb nail");  
})();


Hooks.on("importAdventure",  (adventure, formData, created, updated) => 
{
	  
	game.scenes.forEach(async(scene)=>
	{
		 
		try{ 
			
			if(!THUMB_NAME_MAP.has(scene.name)){
				return;
			}
			console.log(`Start regenerated thumbnail for ${scene.name}`);
			await scene.update({thumb: `modules/${MODULE_NAME}/assets/scenes/${THUMB_NAME_MAP.get(scene.name)}`);
		}
		catch(e){
			console.error(e);
		}
	});
	console.log("Thumbnails regenrated with success!");
 
 });
