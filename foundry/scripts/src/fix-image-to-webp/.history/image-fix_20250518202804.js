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
const possibleImgPaths = ["modules/candlekeep-5ed/images/","modules/common-assets/images","modules/ravenloft-adventures/images"];
 

Hooks.on("ready", async () => {
  console.log("Inicializando correção de URLs");
   await updateImages();
});
 

async function updateImages() {
  const actors = game.actors;

  // Remove barra final se houver
  if (newBaseUrl.endsWith("/")) {
    newBaseUrl = newBaseUrl.slice(0, -1);
  }

  const npcs = game.actors.filter(actor => actor.type === "npc");

  if (npcs.length === 0) {
    ui.notifications.warn("Nenhum NPC encontrado.");
    return;
  }

  for (let npc of npcs) {
    const oldImg = npc.img;
    const oldTokenImg = npc.prototypeToken?.texture?.src ?? oldImg;

    // Extrai o nome do arquivo da imagem antiga 
    const filenamePortrait = oldImg.split("/").pop();
    const filenameToken = oldTokenImg.split("/").pop();

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
}
