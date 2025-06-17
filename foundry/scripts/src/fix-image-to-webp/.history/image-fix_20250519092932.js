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
  console.log("==================================");
   console.log("==================================");
  console.log("🧩 Inicializando correção de imagens V1.1");
  console.log("================================");
   console.log("==================================");

   await updateImages();
});
 

async function exist(path) { 
  try {
    const response = await fetch(path, { method: 'HEAD' });
    const ret = response.ok; 
    return ret;
  } catch (e) {
    console.warn(`Erro ao verificar arquivo: ${e}`);
    return false;
  }
}

function log(...args) {
  const now = new Date();

  const pad = (num) => num.toString().padStart(2, '0');

  const timestamp = 
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) + // MM: mês (0-indexado)
    pad(now.getDate()) +      // DD
    pad(now.getHours()) +     // HH
    pad(now.getMinutes()) +   // mm
    pad(now.getSeconds());    // SS

  const prefix = `${timestamp}-IMAGE-FIX-`;

//  console.log(prefix + args.map(arg => String(arg)).join(' '));
  console.log(prefix , ...args);
}


async function updateImages() {
  const actors = game.actors;
  let items = []; 
  log(`Corrigindo  ${actors?.contents.length} atores`);  
  await updateImagesCollection("ator",actors,items); 
 log("Corrigindo  pelo menos ",items?.length??items?.contents?.length," itens e efeitos encontrados na coleção de atores ");  
  while(items.length > 0)
  {
    let newItems = [];
    await updateImagesCollection("item e efeito",items,newItems);
    items = newItems;
  }
  
  items = [];
  log(`Corrigindo  ${game?.scenes?.contents?.length} cenas`);  
  await updateImagesCollection("cena",game.scenes,items);
  log("Corrigindo pelo menos ",items?.length??items?.contents?.length," tiles e journals encontrados na coleção de cenas");  
  while(items.length > 0)
  {
    let newItems = [];
    await updateImagesCollection("tiles e journals",items,newItems);
    items = newItems;
  }

  items = [];
  log(`Corrigindo  ${game?.journal?.contents?.length} journals`);  
  await updateImagesCollection("cena",game.journal,items);
  log("Corrigindo pelo menos ",items?.length??items?.contents?.length," pages encontrados na coleção de cenas");  
  while(items.length > 0)
  {
    let newItems = [];
    await updateImagesCollection("pages",items,newItems);
    items = newItems;
  }
 
}

/**
 * Testado e funcionando
 * ator.imagem
 * ator.token
 * item.imagem
 * magia.imagem
 * skills.imagem
 * cena.imagem
 * page.content.text (imagem interna)
 * 
 * Testado e não funcionando
 * imagens htttp
 * Precisa testar melhor pois parece não funcionar:
 * tiles.imagem
 * jornal.imagem
 * **/


async function updateImagesCollection(name,collection,items) {
  
 
  if (collection.length === 0) {
    log("==================================");
    log(`Nenhum ${name} encontrado na  colecao `);
    log("==================================");
    return;
  }
  else{
     log("==================================");
    log("Iniciando correção de collecao de ",name);
    log("==================================");
   
  }

  for (let item of collection) {
 
    // Extrai o nome do arquivo da imagem antiga 
    //const filenamePortrait = oldImg.split("/").pop();
    //const filenameToken = oldTokenImg.split("/").pop();

    
      let srcMain = item.img ?? item.document?.texture?.src ??  item.background?.src;
      let srcSecondary = item.src ?? item.prototypeToken?.texture?.src ??  item.foreground?.src ??  item.foreground;
      
      //adiciona os subitens
      if(item.items?.contents?.length > 0)
      {
        items.push(...item.items.contents);
      }

      if(item.effects?.contents?.length > 0)
      {
        items.push(...item.effects.contents);
      }
      
      if(item.pages?.contents?.length > 0)
      {
        items.push(...item.pages.contents);
      }

      if(item?.tiles?.contents?.length > 0)
      {
        items.push(...item.tiles.contents);
      }

      if(item.journalNotes?.contents?.length > 0)
      {
        items.push(...item.journalNotes.contents);
      }

      
      if(item.text?.content)
      {
        log(`A ${name} ${item.name} é uma página e o conteúdo pode ter imagens e será ignorado`); 
        continue;
      }


      if(!srcMain && !srcSecondary)
      {
        log(`O ${name} ${item.name} não possui imagem alguma e vai ser ignorado.`); 
        continue;
      }
      else if(!srcMain)
      {
        log(`O ${name} ${item.name} não possui imagem primária.`); 
      }
      else if(!srcSecondary)
      {
          log(`O ${name} ${item.name} não possui imagem secundária.`); 
      }
      
  
      if(srcMain && srcMain.indexOf("http") !== -1)
      {
        log(`A imagem principal ${item.name} do ${name} é uma URL e vai ser ignorada.`); 
        srcMain=null;
      }


      if(srcSecondary && srcSecondary.indexOf("http") !== -1)
      {
        log(`A imagem secundária ${item.name} do ${name} é uma URL e vai ser ignorada.`); 
        srcMain=null;
      }

    
        
      if(srcMain)
      {
        if(await exist(srcMain)) {
          log(`A imagem do ${name} -  ${item.name} -  existe.`);
          continue;
        }
        else{
          log(`A imagem ${srcMain} do  ${name} -  ${item.name}  não existe.`);
        }
      }

      if(srcSecondary)
      {
        if(await exist(srcSecondary)) {
          log(`A imagem secundária do ${name} -  ${item.name}  existe.`);
          continue;
        }
        else{
          log(`A imagem secundária  ${srcMain} do ${name} -  ${item.name} não existe.`);
        }
      } 

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
