/*
// Caminho da nova imagem para os NPCs
const newImgPath = "icons/creatures/monsters/dragon-red.webp"; // Substitua com o caminho desejado

// Filtra todos os actors do tipo "npc"
const npcs = game.actors.filter(actor => actor.type === "npc");

if (npcs.length === 0) {
  ui.notifications.warn("Nenhum NPC encontrado.");
} else {
  for (let npc of npcs) {
    await npc.update({ img: newImgPath });
    console.log(`Imagem alterada para: ${npc.name}`);
  }
  ui.notifications.info(`Imagem atualizada para ${npcs.length} NPC(s).`);
}
*/

const fs = require('fs/promises'); 

async function exist(path) { 
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch (e) {
    console.warn(`Erro ao verificar arquivo: ${e}`);
    return false;
  }
}


const possibleImgPaths = ["modules/candlekeep-5ed/images/","modules/common-assets/images","modules/ravenloft-adventures/images"];
 

Hooks.on("ready", async () => {
  console.log("Inicializando correção de imagens");
   await updateImages();
});
 

async function updateImages() {
  const actors = game.actors;
 
  if (actors.length === 0) {
    ui.notifications.warn("Nenhum Ator encontrado.");
    return;
  }

  for (let actor of actors) {
    const oldImg = actor.img;
    const oldTokenImg = actor.prototypeToken?.texture?.src ?? oldImg;

    // Extrai o nome do arquivo da imagem antiga 
    //const filenamePortrait = oldImg.split("/").pop();
    //const filenameToken = oldTokenImg.split("/").pop();

    if(oldImg?.contains())

    if(exist(oldImg)) {
      console.log(`A imagem ${oldImg} do ator existe.`);
      continue;
    }

      console.log(`A imagem ${oldImg} do ator não existe.`);

    /*
        // Monta a nova URL com a base fornecida e o nome original do arquivo
        
        const newPortrait = `${newBaseUrl}/${filenamePortrait}`;
        const newToken = `${newBaseUrl}/${filenameToken}`;
      
        await npc.update({ 
          img: newPortrait,
          prototypeToken: {
            texture: {
              src: newToken
            }
          }
        });
        console.log(`NPC '${npc.name}' atualizado para imagem: ${newImg}`);
      }

      ui.notifications.info(`Atualizadas as imagens de ${npcs.length} NPC(s).`);

      */
    }
}
