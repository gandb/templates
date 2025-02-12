// for dnd5e version 3.0.0+
// Prevent Players from Identifying their items by hiding the buttons from them, only the GM will be able to Identify them
// Remove Identify button at top of Item Sheet
Hooks.on("renderItemSheet", (sheet, [html]) => {
  //console.log("renderItemSheet");
  if (game.user.isGM) return;
  const unidentified = sheet.item.system.identified === false;
  if (!unidentified) return;
  html.querySelectorAll(".dnd5e.sheet.item .sheet-header .item-subtitle label:has(input:not([disabled]))").forEach(n => n.remove());
  html.querySelectorAll(".toggle-identified").forEach(n=>n.remove());
});

// Remove Identify button from Item Context menu on Actor Sheet
Hooks.on("dnd5e.getItemContextOptions", (item, buttons) => { 
    //console.log("getItemContextOptions");
    if (game.user.isGM) return;
    const unidentified = item.system.identified === false;
    if (!unidentified) return;
    const removeUnid = buttons.findIndex(option => option.name === 'DND5E.Identify');
    buttons.findSplice(e => e.name === "DND5E.Identify");
});

/*
 
Hooks.on("init",   () => {
  console.log("init","ready teste");
  let item = game?.items?.find(item => item?.id == "Rj6fh9Sg59QTCHkm");
  console.log("x777","Item",item);
});
 
Hooks.on("ready",   () => {
  console.log("ready","ready teste");
  let item = game?.items?.find(item => item?.id == "Rj6fh9Sg59QTCHkm");
  console.log("ready","Item",item);
 });
 
 */
 