
/**
 * Testado e funcionando:
 * ator.imagem
 * ator.token
 * item.imagem
 * magia.imagem
 * skills.imagem
 * cena.imagem
 * page.content.text (imagem interna com main de marker)
 * page.content.text (imagem interna com img de marker)
 * imagens htttp 
 * http onde nao é página
 * tiles.imagem
 * 
 * 
 * Testado e não funcionando:
 * Trocar a extensao diferente de webp pra webp <==estou a trabalhar nesta, ver urlToLocal
 * procurar se nao encontrar, em locais alternativos (ravenloft, candlekeep,etc) <=e nesta ao mesmo tempo, ver urlToLocal
 * fazer o update
 * 
 * Erros comuns:
 * modules/ravenloft-adventures/imagesadventure/CoS/081-cos07-05.png
 * modules/ravenloft-adventures/imagesimages/ravenloft/o-retrato.webp
 * modules/ravenloft-adventures/imagestokens/ravenloft/npcs/gertruda.webp 
 * modules/ravenloft-adventures/imageshttps://www.webp
 * 
 * 
 * Análise dos erros:
 * modules/ravenloft-adventures/imagesadventure/CoS/081-cos07-05.png
 * 1-) antes de conectar ele precisa checar se tem barra num dos dois, se não tiver tem que por pra não grudar. 
 * Um jeito simples é sempre por barra no final das possibilidades e sempre remover da que chega
 * 2-) O caminho procurado não era webp, porque não foi trocado ?
 * 
 * modules/ravenloft-adventures/imagesimages/ravenloft/o-retrato.webp
 * 1-) se o começo da url começar com imagens/ravenloft deve ser removido
 * 2-) se começar somente com imagens também pois todas as possibilidades já incluem esta pasta
 * 
 * modules/ravenloft-adventures/imagestokens/ravenloft/npcs/gertruda.webp
 * 1-)  se o começo da url começar com imagens/tokens/ravenloft deve ser removido também
 * 
 *  modules/ravenloft-adventures/imageshttps://www.webp
 * 1-) se começa com http deveria considerar como URL e ignorar se nao conseguisse extrair o caminho relativo
 * 
 * especial
 * svg nao pode trocar por webp 
 * /images/ravenloft/ também é um marker
 * 
 * ==RAVENLOFT CLEAN==
 * Tem que melhorar os numeros abaixo, as TROCAS que valem e deram 0 -2025-05-21 8h
 * 20250521003229-IMAGE-FIX- SUMARY: TODAS AS IMAGENS CORRIGIDAS
* image-fix.js:344 20250521003229-IMAGE-FIX- SUMARY: FALHAS:420
* image-fix.js:344 20250521003229-IMAGE-FIX- SUMARY: TROCAS:0
* image-fix.js:344 20250521003229-IMAGE-FIX- SUMARY: JA ESTAVAM CORRETAS:1523
 * 
 * 
 *  
 *2025-05-21 23:40    
20250522014134-IMAGE-FIX- SUMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:644 20250522014134-IMAGE-FIX- SUMARY: FALHAS:738
image-fix.js:644 20250522014134-IMAGE-FIX- SUMARY: TROCAS:2
image-fix.js:644 20250522014134-IMAGE-FIX- SUMARY: JA ESTAVAM CORRETAS:1523


2025-05-23 00:24 
20250523002420-IMAGE-FIX- TODAS AS IMAGENS CORRIGIDAS
image-fix.js:717 20250523002420-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:717 20250523002420-IMAGE-FIX- SUMMARY: FALHAS:176
image-fix.js:717 20250523002420-IMAGE-FIX- SUMMARY: TROCAS:40
image-fix.js:717 20250523002420-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:2253


2025-05-23- 22:53
20250523225208-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:717 20250523225208-IMAGE-FIX- SUMMARY: FALHAS:86
image-fix.js:717 20250523225208-IMAGE-FIX- SUMMARY: TROCAS:130
image-fix.js:717 20250523225208-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:2253

20250524161305-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:970 20250524161305-IMAGE-FIX- SUMMARY: FALHAS:81
image-fix.js:970 20250524161305-IMAGE-FIX- SUMMARY: TROCAS:135
image-fix.js:970 20250524161305-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:2355

20250524163227-IMAGE-FIX- TODAS AS IMAGENS CORRIGIDAS
image-fix.js:989 20250524163227-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:989 20250524163227-IMAGE-FIX- SUMMARY: FALHAS:13
image-fix.js:989 20250524163227-IMAGE-FIX- SUMMARY: TROCAS:203
image-fix.js:989 20250524163227-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:2355

==RAVENLOFT MODULE== 
20250525172043-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:1118 20250525172043-IMAGE-FIX- SUMMARY: FALHAS:16
image-fix.js:1118 20250525172043-IMAGE-FIX- SUMMARY: TROCAS:373
image-fix.js:1118 20250525172043-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:2531
--depois (por algum motivo ele repetia as corretas mas nunca achei o bug)
20250525172314-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:1118 20250525172314-IMAGE-FIX- SUMMARY: FALHAS:15
image-fix.js:1118 20250525172314-IMAGE-FIX- SUMMARY: TROCAS:0
image-fix.js:1118 20250525172314-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:573

==CANDLEKEEP MODULE==
image-fix.js:728 20250523235143-IMAGE-FIX- TODAS AS IMAGENS CORRIGIDAS
image-fix.js:728 20250523235143-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:728 20250523235143-IMAGE-FIX- SUMMARY: FALHAS:11
image-fix.js:728 20250523235143-IMAGE-FIX- SUMMARY: TROCAS:185
image-fix.js:728 20250523235143-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:3117

20250524160919-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:960 20250524160919-IMAGE-FIX- SUMMARY: FALHAS:10
image-fix.js:960 20250524160919-IMAGE-FIX- SUMMARY: TROCAS:186
image-fix.js:960 20250524160919-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:3117

20250524163805-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:1003 20250524163805-IMAGE-FIX- SUMMARY: FALHAS:3
image-fix.js:1003 20250524163805-IMAGE-FIX- SUMMARY: TROCAS:193
image-fix.js:1003 20250524163805-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:3117


20250525151150-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:1044 20250525151150-IMAGE-FIX- SUMMARY: FALHAS:72
image-fix.js:1044 20250525151150-IMAGE-FIX- SUMMARY: TROCAS:317
image-fix.js:1044 20250525151150-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:5150

20250525151250-IMAGE-FIX- TODAS AS IMAGENS CORRIGIDAS
image-fix.js:1048 20250525151250-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:1048 20250525151250-IMAGE-FIX- SUMMARY: FALHAS:72
image-fix.js:1048 20250525151250-IMAGE-FIX- SUMMARY: TROCAS:317
image-fix.js:1048 20250525151250-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:5150

==RAVENLOFT F15==
20250523234800-IMAGE-FIX- TODAS AS IMAGENS CORRIGIDAS
image-fix.js:724 20250523234800-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:724 20250523234800-IMAGE-FIX- SUMMARY: FALHAS:102
image-fix.js:724 20250523234800-IMAGE-FIX- SUMMARY: TROCAS:126
image-fix.js:724 20250523234800-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:3369

20250524160554-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:956 20250524160554-IMAGE-FIX- SUMMARY: FALHAS:93
image-fix.js:956 20250524160554-IMAGE-FIX- SUMMARY: TROCAS:135
image-fix.js:956 20250524160554-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:3369

20250524163540-IMAGE-FIX- TODAS AS IMAGENS CORRIGIDAS
image-fix.js:998 20250524163540-IMAGE-FIX- SUMMARY: TODAS AS IMAGENS CORRIGIDAS
image-fix.js:998 20250524163540-IMAGE-FIX- SUMMARY: FALHAS:12
image-fix.js:998 20250524163540-IMAGE-FIX- SUMMARY: TROCAS:216
image-fix.js:998 20250524163540-IMAGE-FIX- SUMMARY: JA ESTAVAM CORRETAS:3369

 */

const mapChangeFiles =new Map( [["horse.webp","modules/common-assets/images/assets/horse.webp"],
 ["fire.webp","modules/common-assets/images/assets/fire.webp"],
 ["fogueira.webp","modules/common-assets/images/assets/fogueira.webp"],
 ["lanterna.webp","modules/common-assets/images/assets/lanterna.webp"],
 ["torch.webp","modules/common-assets/images/assets/torch.webp"],
 ["candlekeep.webp","modules/forgotten-realms/images/maps/candlekeep.webp"],
 ["area1-archade-gate-foreground.webp","modules/forgotten-realms/images/areas/candlekeep/area1-archade-gate-foreground.webp"],
 ["eviltree.webp","modules/common-assets/images/mobs/eviltree.webp"],
 ["Banshee_3.webp","modules/common-assets/images/npcs/Banshee_3.webp"],
 ["Borval.webp","modules/ravenloft-adventures/images/npcs/Borval.webp"],
 ["carroca.webp","modules/ravenloft-adventures/images/vehicle/carroca.webp"],
 ["clerigo-morto.webp","modules/common-assets/images/assets/clerigo-morto.webp"],
 ["Flameskull.webp","modules/common-assets/images/5etools/bestiary/MM/Flameskull.webp"],
 ["skull-dragon-head.webp","modules/common-assets/images/map-itens/skull-dragon-head.webp"],
 ["drullor.webp","modules/common-assets/images/pcs/drullor.webp"],
 ["espantalho.webp","modules/common-assets/images/mobs/espantalho.webp"],
 ["garra-rastejante.webp","modules/common-assets/images/mobs/garra-rastejante.webp"],
 ["GorvanRadosh.webp","modules/ravenloft-adventures/images/npcs/GorvanRadosh.webp"],
 ["partyToken.webp","modules/forgotten-realms/images/etc/partyToken.webp"],
 ["warrior-portrait.webp","modules/ravenloft-adventures/images/npcs/warrior-portrait.webp"],
 ["bullywug.webp","modules/common-assets/images/npcs/bullywug.webp"],
 ["man.webp","modules/common-assets/images/npcs/man.webp"],
 ["leorian.webp","modules/common-assets/images/pcs/leorian.webp"],
 ["Lortrin.webp","modules/common-assets/images/pcs/Lortrin.webp"],
 ["Lucian_Petrovich.webp","modules/ravenloft-adventures/images/npcs/Lucian_Petrovich.webp"],
 ["lucy-stele.webp","modules/common-assets/images/pcs/lucy-stele.webp"],
 ["naiade.webp","modules/common-assets/images/npcs/naiade.webp"],
 ["Qinvalur.webp","modules/common-assets/images/pcs/Qinvalur.webp"],
 ["soldier.webp","modules/dnd-players-handbook/assets/icons/backgrounds/soldier.webp"],
 ["sowyer.webp","modules/common-assets/images/pcs/sowyer.webp"],
 ["Thraemwyck.webp","modules/ravenloft-adventures/images/npcs/Thraemwyck.webp"],
 ["zaruk.webp","modules/common-assets/images/pcs/zaruk.webp"],
 ["colina.webp","modules/ravenloft-adventures/images/areas/Y. Colina-Yester/colina.webp"],
 ["106-cos1101.webp","modules/common-assets/images/5etools/adventure/CoS/106-cos1101.webp"],
 ["abadia1oAndar.webp","modules/ravenloft-adventures/images/areas/S.Village-of-Krezk/abadia1oAndar.webp"],
 ["abadia2.webp","modules/ravenloft-adventures/images/areas/S.Village-of-Krezk/abadia2.webp"],
 ["vistani-camp.webp","modules/ravenloft-adventures/images/areas/N-Valakki/vistani-camp.webp"],
 ["Berez.webp","modules/ravenloft-adventures/images/areas/U. As-Ruinas-de-Berez/Berez.webp"],
 ["135-deathhouseplayer.webp","modules/common-assets/images/5etools/adventure/CoS/135-deathhouseplayer.webp"],
 ["valakki.webp","modules/ravenloft-adventures/images/areas/N-Valakki/valakki.webp"],
 ["druid-circle.webp","modules/ravenloft-adventures/images/areas/Y. Colina-Yester/druid-circle.webp"],
 ["grid.webp","modules/common-assets/images/areas/grid.webp"],
 ["church.webp","modules/ravenloft-adventures/images/areas/E-Barovia/church.webp"],
 ["igreja-sitiada.webp","modules/ravenloft-adventures/images/areas/N-Valakki/igreja-sitiada.webp"],
 ["loja-de-caixoes.webp","modules/ravenloft-adventures/images/areas/N-Valakki/loja-de-caixoes.webp"],
 ["Castle_Ravenloft_B1_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_B1_NoGrid.webp"],
 ["Castle_Ravenloft_B2_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_B2_NoGrid.webp"],
 ["Castle_Ravenloft_Courtyard_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_Courtyard_NoGrid.webp"],
 ["Castle_Ravenloft_Base_Unlit_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_Base_Unlit_NoGrid.webp"],
 ["Castle_Ravenloft_F1_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F1_NoGrid.webp"],
 ["Castle_Ravenloft_F2_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F2_NoGrid.webp"],
 ["Castle_Ravenloft_F3_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F3_NoGrid.webp"],
 ["Castle_Ravenloft_F4_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F4_NoGrid.webp"],
 ["Castle_Ravenloft_F5_NoHeart_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F5_NoHeart_NoGrid.webp"],
 ["Castle_Ravenloft_F6_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F6_NoGrid.webp"],
 ["village-street.webp","modules/common-assets/images/areas/village-street.webp"],
 ["sattic-susie.webp","modules/ravenloft-adventures/images/areas/N-Valakki/sattic-susie.webp"],
 ["trilha-bloqueada.webp","modules/common-assets/images/areas/trilha-bloqueada.webp"],
 ["barovia-jogador.webp","modules/ravenloft-adventures/images/areas/E-Barovia/barovia-jogador.webp"],
 ["128-cos1501.webp","modules/common-assets/images/5etools/adventure/CoS/128-cos1501.webp"],
 ["PSS0608TigerClearing_x.webp","modules/common-assets/images/areas/PSS0608TigerClearing_x.webp"],
 ["plataforma-madeira.webp","modules/common-assets/images/areas/plataforma-madeira.webp"],
 ["Banshee_3.webp","modules/common-assets/images/npcs/Banshee_3.webp"],
 ["horse.webp","modules/common-assets/images/assets/horse.webp"],
 ["clerigo-morto.webp","modules/common-assets/images/assets/clerigo-morto.webp"],
 ["danika-dorakova.webp","modules/ravenloft-adventures/images/npcs/danika-dorakova.webp"],
 ["mosquito.webp","modules/common-assets/images/npcs/mosquito.webp"],
 ["warrior-portrait.webp","modules/ravenloft-adventures/images/npcs/warrior-portrait.webp"],
 ["Henrik.webp","modules/ravenloft-adventures/images/npcs/Henrik.webp"],
 ["Irena.webp","modules/ravenloft-adventures/images/npcs/Irena.webp"],
 ["Lucian_Petrovich.webp","modules/ravenloft-adventures/images/npcs/Lucian_Petrovich.webp"],
 ["naiade.webp","modules/common-assets/images/npcs/naiade.webp"],
 ["Luvash.webp","modules/common-assets/images/5etools/bestiary/CoS/Luvash.webp"],
 ["Milivoj.webp","modules/common-assets/images/5etools/bestiary/CoS/Milivoj.webp"],
 ["Banshee_3.webp","modules/common-assets/images/npcs/Banshee_3.webp"],
 ["Rictavio-token.webp","modules/ravenloft-adventures/images/npcs/Rictavio-token.webp"],
 ["soldier.webp","modules/dnd-players-handbook/assets/icons/backgrounds/soldier.webp"],
 ["szoldar.webp","modules/ravenloft-adventures/images/npcs/szoldar.webp"],
 ["Thraemwyck.webp","modules/ravenloft-adventures/images/npcs/Thraemwyck.webp"],
 ["yeska.webp","modules/ravenloft-adventures/images/npcs/yeska.webp"],
 ["Yevgeni.webp","modules/ravenloft-adventures/images/npcs/Yevgeni.webp"],
 ["106-cos1101.webp","modules/common-assets/images/5etools/adventure/CoS/106-cos1101.webp"],
 ["wizardWine.webp","modules/ravenloft-adventures/images/areas/W.OMagodosVinhos/wizardWine.webp"],
 ["abadia1oAndar.webp","modules/ravenloft-adventures/images/areas/S.Village-of-Krezk/abadia1oAndar.webp"],
 ["abadia2.webp","modules/ravenloft-adventures/images/areas/S.Village-of-Krezk/abadia2.webp"],
 ["vistani-camp.webp","modules/ravenloft-adventures/images/areas/N-Valakki/vistani-camp.webp"],
 ["gulthias.webp","modules/ravenloft-adventures/images/areas/Y. Colina-Yester/gulthias.webp"],
 ["ravenloft-domain.webp","modules/ravenloft-adventures/images/areas/ravenloft-domain.webp"],
 ["cabana-baba.webp","modules/ravenloft-adventures/images/areas/U. As-Ruinas-de-Berez/cabana-baba.webp"],
 ["135-deathhouseplayer.webp","modules/common-assets/images/5etools/adventure/CoS/135-deathhouseplayer.webp"],
 ["valakki.webp","modules/ravenloft-adventures/images/areas/N-Valakki/valakki.webp"],
 ["druid-circle.webp","modules/ravenloft-adventures/images/areas/Y. Colina-Yester/druid-circle.webp"],
 ["road.webp","modules/common-assets/images/areas/road.webp"],
 ["church.webp","modules/ravenloft-adventures/images/areas/E-Barovia/church.webp"],
 ["IgrejaVa.webp","modules/common-assets/images/areas/IgrejaVa.webp"],
 ["igreja-sitiada.webp","modules/ravenloft-adventures/images/areas/N-Valakki/igreja-sitiada.webp"],
 ["krezk.webp","modules/ravenloft-adventures/images/areas/S.Village-of-Krezk/krezk.webp"],
 ["loja-de-caixoes.webp","modules/ravenloft-adventures/images/areas/N-Valakki/loja-de-caixoes.webp"],
 ["Argusnvostholr.webp","modules/ravenloft-adventures/images/areas/Q. Argynvostholt/Argusnvostholr.webp"],
 ["Argusnvostholr3oAndar.webp","modules/ravenloft-adventures/images/areas/Q. Argynvostholt/Argusnvostholr3oAndar.webp"],
 ["wachterhaus.webp","modules/ravenloft-adventures/images/areas/N-Valakki/wachterhaus.webp"],
 ["mansao-do-barao.webp","modules/ravenloft-adventures/images/areas/N-Valakki/mansao-do-barao.webp"],
 ["Castle_Ravenloft_B1_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_B1_NoGrid.webp"],
 ["Castle_Ravenloft_B2_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_B2_NoGrid.webp"],
 ["Castle_Ravenloft_Courtyard_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_Courtyard_NoGrid.webp"],
 ["Castle_Ravenloft_Base_Unlit_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_Base_Unlit_NoGrid.webp"],
 ["Castle_Ravenloft_F1_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F1_NoGrid.webp"],
 ["Castle_Ravenloft_F2_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F2_NoGrid.webp"],
 ["Castle_Ravenloft_F3_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F3_NoGrid.webp"],
 ["Castle_Ravenloft_F4_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F4_NoGrid.webp"],
 ["Castle_Ravenloft_F5_NoHeart_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F5_NoHeart_NoGrid.webp"],
 ["Castle_Ravenloft_F6_NoGrid.webp","modules/ravenloft-adventures/images/areas/K.Castelo-Ravenloft/Castle_Ravenloft_F6_NoGrid.webp"],
 ["moinhomap.webp","modules/ravenloft-adventures/images/areas/O.Moinho-Moiossos/moinhomap.webp"],
 ["bluewatterinn.webp","modules/ravenloft-adventures/images/areas/N-Valakki/bluewatterinn.webp"],
 ["pantano.webp","modules/common-assets/images/areas/pantano.webp"],
 ["village-street.webp","modules/common-assets/images/areas/village-street.webp"],
 ["sotao.webp","modules/common-assets/images/areas/sotao.webp"],
 ["sattic-susie.webp","modules/ravenloft-adventures/images/areas/N-Valakki/sattic-susie.webp"],
 ["ambarTemple.webp","modules/ravenloft-adventures/images/areas/X-O-Templo-de-Ambar/ambarTemple.webp"],
 ["ambarTempleUnderground.webp","modules/ravenloft-adventures/images/areas/X-O-Templo-de-Ambar/ambarTempleUnderground.webp"],
 ["tenda.webp","modules/common-assets/images/areas/tenda.webp"],
 ["trilha-bloqueada.webp","modules/common-assets/images/areas/trilha-bloqueada.webp"],
 ["barovia-jogador.webp","modules/ravenloft-adventures/images/areas/E-Barovia/barovia-jogador.webp"],
 ["128-cos1501.webp","modules/common-assets/images/5etools/adventure/CoS/128-cos1501.webp"],
 ["PSS0608TigerClearing_x.webp","modules/common-assets/images/areas/PSS0608TigerClearing_x.webp"],
 ["barragem.webp","modules/ravenloft-adventures/images/areas/aventuras-gancho/O-Destino-das-Amaandríadas/barragem.webp"],
 ["acampamento.webp","modules/ravenloft-adventures/images/areas/aventuras-gancho/O-Destino-das-Amaandríadas/acampamento.webp"],
 ["plataforma-madeira.webp","modules/common-assets/images/areas/plataforma-madeira.webp"],
 ["estatua.webp","modules/common-assets/images/assets/estatua.webp"]] );


const DEBUG = false;
const POSSSIBLE_PLACES = [ 'modules/common-assets/images/5etools','modules/common-assets/images',"modules/ravenloft-adventures/images","modules/forgotten-realms/images"];
const POSSSIBLE_MARKES = [ '/images/ravenloft/',"/images/5etools/","/assets/srd5e/img/",'/ravenloft/images/',"/tokens/ravenloft","/modules/ravenloft/","/worlds/a-maldicao-de-strahd-clean/assets/",'/images/',"/main/","/img/","/token/"];
const IGNORE_MARKES = ["systems/dnd5e"];

let fails = 0;
let replaced = 0;
let alreadyCorrect = 0;
   


Hooks.on("ready", async () => {
  console.log("==================================");
  console.log("==================================");
  console.log("🧩 Inicializando correção de imagens V1.1");
  console.log("================================");
  console.log("=================================="); 
  
  await updateImages();
});

async function updateImages() {
  const actors = game.actors;
  let items = []; 
  log(`Corrigindo  ${actors?.contents.length} atores`);  
  await updateImagesCollection("ator",actors,items); 

  if(DEBUG)
  {
     printSummary();
    return;
  }

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
   while(items && items?.length &&  items.length > 0)
  {
    let newItems = [];
    await updateImagesCollection("tiles e journals",items,newItems);
    items = newItems;
  }

  items = [];
  log(`Corrigindo  ${game?.journal?.contents?.length} journals`);  
  await updateImagesCollection("journals",game.journal,items);
  log("Corrigindo pelo menos ",items?.length??items?.contents?.length," pages encontrados na coleção de journals");  
  while(items && items?.length &&  items.length > 0)
  {
    let newItems = [];
    await updateImagesCollection("pages",items,newItems);  
    items = newItems;
    log(`pages corrigidos`,items);
  }
     
  printSummary();
}

function printImageDebug(mark,primary,secondary){
  if(!primary)
  {
    return;
  }
  if(!primary.indexOf)
  {
    console.error(new Error("Primary inst a string"),primary);
    return;
  }
  if(primary.indexOf("pantano")>=0)
  {
    log("UPDATE-COLLECTION-DEBUG:mark:",mark,",primary:",primary,",secondary:",secondary);
  }
 
 // log("UPDATE-COLLECTION-DEBUG:mark:",mark,",primary:",primary,",secondary:",secondary);
}



async function updateObject(object, typeObject,newImgPath){  
 
 // log("updateObject",1,typeObject);
 

  if(!object)
  {
    return;
  }
 
  //log("updateObject",2);
  if(typeObject=="foreground")
  {
    // log("updateObject",2.1,typeObject,object);
     await object.update({  "foreground": newImgPath });
      // log("updateObject",2.11,typeObject,object);
      return;
  }

//  log("updateObject",2.3);
  if(typeObject=="img")
  {
  //   log("updateObject",2.4,typeObject,object);
     await object.update({  "img": newImgPath });
    // log("updateObject",2.41,typeObject,object);
     return
  }
   
//  log("updateObject",3);
  if(typeObject=="document.texture.src")
  { 
     await object.update( 
      {
        document: 
        {
          texture: {
            src: newImgPath
          }
        }
    });
  //    log("updateObject",3.1);
      return;
  }
//  log("updateObject",4);
  if(typeObject=="background.src")
  { 
  //   log("updateObject",4.1);
     await object.update( 
      {
        background: 
        {
          src: newImgPath
        }
    });
    // log("updateObject",4.2);
     return
  }
//  log("updateObject",5);
  if(typeObject=="texture.src")
  { 
  //    log("updateObject",5.1);
     await object.update( 
      {
        texture: 
        {
          src: newImgPath
        }
    });
    //log("updateObject",5.2)
    return;

  }

//  log("updateObject",6);
  if(typeObject== "prototypeToken.texture.src")
  { 
     await object.update( 
      {
        prototypeToken: 
        {
          texture: {
            src:newImgPath
          }
        }
    });
    //log("updateObject",6.1);
    return; 
  }

  if(typeObject=="foreground.src")
  {
     await object.update( 
      {
        foreground: 
        {
          src:newImgPath 
        }
    });
  }

  
  if(typeObject=="item.text.content")
  {
     await oject.update( 
      {
        text: 
        {
          content:newImgPath 
        }
    });
  }

  

//  log("Update object: " ,object?.name??object );
}


async function updateImagesCollection(name,collection,items) {
    log(`===COLLECTION ${name}===`);
    let size = collection.length ?? collection.size;
    if (size === 0) {
    
      log(`Nenhum ${name} encontrado na colecao  ${name}`);
      log("==================================");
      return;
    }
    else{ 
      log(`${size} encontrados na colecao ${name}` ); 
      log("==================================");
    }
   
  for (let item of collection) { 
      let correctedPrimary = false;
      let correctedSecondary = false;
      
    
      if(!item.name)
      {
        item.name="sem nome";
      }
  
  
   
      let srcMain = item.img;
      let srcMainType = "img";
      if(!srcMain && item.document?.texture?.src)
      {
        srcMain = item.document?.texture?.src;
        srcMainType = "document.texture.src";
      }

      if(!srcMain && item.background?.src)
      {
        srcMain = item.background?.src;
        srcMainType = "background.src";
      }

      if(!srcMain && item.texture?.src)
      {
        srcMain = item.background?.src;
        srcMainType = "texture.src";
      }

      

      let srcSecondary =  item.foreground?.src ;
      let srcSecondaryType = "foreground.src";
 

      if(!srcSecondary &&  item.foreground?.src)
      {
        srcSecondary =  item.foreground;
        srcSecondaryType = "foreground";
      }
 
      if(!srcSecondary && item.prototypeToken?.texture?.src)
      {
        
        srcSecondary = item.prototypeToken?.texture?.src; 
        srcSecondaryType = "prototypeToken.texture.src";
      }
 
      let srcMainOriginal = srcMain;
      let srcSecondaryOriginal =  srcSecondary;

      printImageDebug("0",srcMain,srcSecondary);



      if(!srcMain&&!srcSecondary) continue;

     // printImageDebug("texture", item.prototypeToken?.texture?.src);
      //printImageDebug("foreground",item.foreground?.src);
      //printImageDebug("foreground.src", item.foreground);


      printImageDebug("0.1",srcMain,srcSecondary);

      if(srcMain && isAnIgnorableMark(srcMain))
      {
        if(isImg(srcMain))
        {
          log(`A imagem do srcMain [${srcMain}] ${name} -  ${item.name} - existe , então não será trocado.`);   
          correctedPrimary=true;
        }
        printImageDebug("0.11",srcMain,srcSecondary);
        srcMain= null;
      }

      if(!correctedPrimary && srcSecondary && isAnIgnorableMark(srcSecondary))
      {
         if(isImg(srcSecondary))
        {
           log(`A imagem do srcMain [${srcSecondary}] ${name} -  ${item.name} - existe , então não será trocado.`);   
           correctedSecondary=true;
        }
        srcSecondary= null;
      }

      if( !correctedPrimary && await exist(srcMainOriginal)) {
        log(`A imagem do srcMain [${srcMainOriginal}] ${name} -  ${item.name} - existe , então não será trocado.`);   
        printImageDebug("0.111",srcMain,srcSecondary);
       
        correctedPrimary=true;
        srcMain=null;
      }

      if(!correctedSecondary && await exist(srcSecondaryOriginal)) {
        log(`A imagem do srcSecondary [${srcSecondaryOriginal}] ${name} -  ${item.name} - existe , então não será trocado.`);  
        correctedSecondary=true;
        srcMain=null;
      }

      printImageDebug("0.2",srcMain,srcSecondary);
 

      if(!srcMain && !srcSecondary) continue;

      if(srcMain) log("ORIGINAL IMG MAIN:",srcMainOriginal);
      if(srcSecondary) log("ORIGINAL IMG SECONDARY:",srcSecondaryOriginal);
      
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

      if(name=="scene")
      {
          log("SCENE 1- " , item);
          const tokens = item.collections?.tokens?.values();
          if(tokens)
          {
             log("SCENE 2- " , item);
              items.push(...tokens.values());
          }
          log("SCENE 3- " , items);
      }


      printImageDebug("0.3",srcMain,srcSecondary);

      if(name === "journals")
      {
        continue;
      }

      printImageDebug("0.4",srcMain,srcSecondary);
 

      if(!srcMain&&!srcSecondary) continue; 
      
      let fileNameWithCorrectlyExtension = getFilenameWithCorrectExtension(srcMain);
 

      if(srcMain && fileNameWithCorrectlyExtension && mapChangeFiles.has(fileNameWithCorrectlyExtension) )
      {
        const newPath = mapChangeFiles.get(fileNameWithCorrectlyExtension);
        if(srcMain.indexOf("pantano")>0) log("Pantano (2) srcMain:",srcMain," srcMainOriginal:",srcMainOriginal, " fileNameWithoutExtension:",fileNameWithCorrectlyExtension , " newPath:",newPath);
        log(`A imagem srcMain [${srcMainOriginal}] do ${name} - ${item.name} - vai ser trocada por ${newPath}.`); 
        await updateObject(item,srcMainType,newPath);
        srcMain=null;
      }
      

      fileNameWithCorrectlyExtension = getFilenameWithCorrectExtension(srcSecondary ) ;
 

      if(srcSecondary && fileNameWithCorrectlyExtension && mapChangeFiles.has(fileNameWithCorrectlyExtension) )
      {
        const newPath = mapChangeFiles.get(fileNameWithCorrectlyExtension); 
 
        log(`A imagem srcSecondary [${srcSecondaryOriginal}] do ${name} - ${item.name} - vai ser trocada por ${newPath}.`); 
        await updateObject(item,srcSecondaryType,newPath);
        srcSecondary=null;
      }
 
      printImageDebug("1",srcMain,srcSecondary);
           
      if(name === "pages")
      {
         
         let text = item.text?.content??""; 
         const urls = extractUrls(text); 
         text = await fixText(text,urls,item,name); 
        const urlsRelatives = extractUrlsRelatives(text); 
        text = await  fixText(text,urlsRelatives,item,name);  
        if(item.text && item.text.content)
        {
          await updateObject(item,"item.text.content",text)
        }
      } 
      
      if(!srcMain&&!srcSecondary) continue;
       printImageDebug("2",srcMain,srcSecondary);

      if(!isImg(srcMain))
      { 
        srcMain=null;
      }

      if(!isImg(srcSecondary))
      { 
        srcSecondary=null;
      } 

      if(!srcMain&&!srcSecondary) continue;
      printImageDebug("4",srcMain,srcSecondary);
     
      if(srcMain && isURL(srcMain))
      {
        
         const relative = await urlToLocal(srcMain);
        if(await exist(relative))
        {
          log(`A imagem srcMain [${srcMainOriginal}] do ${name} - ${item.name} - vai ser trocada por ${relative}.`); 
          await updateObject(item,srcMainType,relative);
          srcMain=null;
        }
        else{ 
        
          const fixPathRelative= await fixPath(relative);
          const mudou = fixPathRelative!==relative; 
          if( mudou && await exist(fixPathRelative))
          {
              log(`A imagem srcMain [${srcMainOriginal}] do ${name} - ${item.name} - vai ser trocada por ${fixPathRelative}.`) 
              await updateObject(item,srcMainType,fixPathRelative);
              srcMain=null;
          }
          else{
            log(`IMPORTANTE!!!! A imagem srcMain [${srcMainOriginal}] do ${name} -  ${item.name}  não existe mesmo.`); 
          }
        }
        srcMain=null;
      }
      
      
      if(!srcMain&&!srcSecondary) continue;
      printImageDebug("5",srcMain,srcSecondary);
      
      if(srcSecondary && isURL(srcSecondary))
      {
        const relative = await urlToLocal(srcSecondary);
        if(await exist(relative))
        {
          log(`A imagem srcSecondary [${srcSecondaryOriginal}] do ${name} - ${item.name} - vai ser trocada por ${relative}.`);  
          await updateObject(item,srcSecondaryType,relative);
          srcSecondary=null;
        }
        else{ 
          const fixPathRelative= await fixPath(relative);
          const mudou = fixPathRelative!==relative;
          if(mudou && await exist(fixPathRelative))
          {
             log(`A imagem srcMain [${srcSecondaryOriginal}] do ${name} - ${item.name} - vai ser trocada por ${fixPathRelative}.`);
             await updateObject(item,srcSecondaryType,fixPathRelative);
             srcSecondary=null;
          }
          else{
            log(`IMPORTANTE!!!! A imagem srcSecondary [${srcSecondaryOriginal}] do ${name} -  ${item.name}  não existe mesmo.`);
          } 
        }
        srcSecondary=null;
      }
      
      if(!srcMain&&!srcSecondary) continue;
      printImageDebug("6",srcMain,srcSecondary);
      printImageDebug("zur",srcMain,"1");

      if(srcMain)
      {
        
        if(await exist(srcMain)) {
          log(`A imagem do srcMain [${srcMainOriginal}] ${name} -  ${item.name} - vai ser trocada por ${srcMain}.`);
          await updateObject(item,srcMainType,srcMain);
          srcMain=null;
        }
        else{ 
          const relative = await urlToLocal(srcMain);
          printImageDebug("zur",relative,"2");
          const fixPathRelative= await fixPath(relative);
          printImageDebug("zur",fixPathRelative,"3");
          const mudou = fixPathRelative!==srcMain;
          if(mudou &&  await exist(fixPathRelative))
          {
              log(`A imagem srcMain [${srcMainOriginal}] do ${name} - ${item.name} - vai ser trocada por ${fixPathRelative}.`);
              await updateObject(item,srcMainType,fixPathRelative);
              srcMain = null;
          }
          else{
            log(`IMPORTANTE!!!! A imagem srcMain [${srcMainOriginal}] do ${name} -  ${item.name}  não existe mesmo.`);
            srcMain = null;
          } 
        }
        srcMain = null;
      }
       if(!srcMain&&!srcSecondary) continue;
      printImageDebug("7",srcMain,srcSecondary);
      
      if(srcSecondary)
      {
        if(await exist(srcSecondary)) {
          log(`A imagem do srcSecondary [${srcSecondaryOriginal}] ${name} -  ${item.name} - vai ser trocada por ${srcSecondary}.`);
          await updateObject(item,srcSecondaryType,srcSecondary);
          srcSecondary=null; 
        }
        else{ 
          const relative = await urlToLocal(srcSecondary);
          const fixPathRelative= await fixPath(relative);
          const mudou = fixPathRelative!==srcSecondary; 
          if(mudou &&  await exist(fixPathRelative))
          {
              log(`A imagem srcSecondary [${srcSecondaryOriginal}] do ${name} - ${item.name} - vai ser trocada por ${fixPathRelative}.`);
              await updateObject(item,srcSecondaryType,fixPathRelative);
              srcSecondary=null; 
          } 
          else{
            log(`IMPORTANTE!!!! A imagem srcSecondary [${srcSecondaryOriginal}] do ${name} -  ${item.name}  não existe mesmo.`);
            srcSecondary=null; 
          } 
        }
         srcSecondary=null; 
      }   
      printImageDebug("8",srcMain,srcSecondary);
    } 
   // log("fim da validacao do item ",count++);
}


function getFilenameWithCorrectExtension(path) {
  if(!path)
  {
    return null;
  }
  if(path.indexOf(".webp")>0)
  {
    return path;
  }
  const lastBar = path.lastIndexOf("/");
  const dotIndex = path.lastIndexOf('.');
  const ret = dotIndex !== -1 ? path.substring(lastBar+1, dotIndex) : path;
  return ret + ".webp"
}


function printSummary(){
  log(`TODAS AS IMAGENS CORRIGIDAS`);
  log(`SUMMARY: TODAS AS IMAGENS CORRIGIDAS`);  
  log(`SUMMARY: FALHAS:${fails}`);  
  log(`SUMMARY: TROCAS:${replaced}`);  
  log(`SUMMARY: JA ESTAVAM CORRETAS:${alreadyCorrect}`);  
}

function isAnIgnorableMark(source)
{
  if(!source)
  {
    return false;
  }

  if(!source.indexOf)
  {
    console.error("ERROR isAnIgnorableMark receive a source isnt  a string :",source);
    return false;
  }
  
  for ( let mark of IGNORE_MARKES){ 
    if(source.indexOf(mark)>=0)
    {
      return true;
    }
  }

}

function extractUrlsRelatives(text){
  
  const urlRegex = /[^"'  ]*\.(jpe?g|png|bmp|gif|tiff|tif|ico)/gi;
  const urls = [];
  let match;
 
  urlRegex.lastIndex = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    let isHTTP =match[0].indexOf("http")==0; 
    if(isHTTP)
    {
      continue;
    }
    let badPath = match[0].indexOf(":")==0; 
    if(badPath)
    {
      continue;
    }

    urls.push(match[0]);
  }
  //log("extractUrlsRelatives",urls);
  return urls;
}

function extractUrls(text) {
  // Exclui espaços, aspas, <, > e também parênteses
  const urlRegex = /https?:\/\/[^\s"'<>()]+/g;
  const urls = [];
  let match;

  // reset pra garantir zero lastIndex
  urlRegex.lastIndex = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    urls.push(match[0]);
  }
  return urls;
}

function trocarExtensao(caminho, novaExtensao) {
    if (!caminho) {
      return caminho;
    }

  if (!caminho.lastIndexOf) {
    console.error("ERROR:trocarExtensao recebeu caminho sem ser string", caminho);
    return caminho;
  }
  const extensaoLimpa = novaExtensao.startsWith('.') ? novaExtensao : '.' + novaExtensao;

  const lastDotIndex = caminho.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return caminho ;
  }

  const prefix = caminho.substring(0, lastDotIndex); 

  const ret =  prefix + extensaoLimpa;
  log("trocarExtensao ret:",ret);
 
  return ret;
}
 

async function urlToLocal(candidate) {
    if(!candidate)
    {
      return candidate;
    }
    if(!candidate.indexOf)
    {
      console.error("ERROR: urlToLocal received candidate but candidate isnt a string : " , candidate);
      return candidate;
    }
    //log("urlToLocal.debug 1",candidate);

    let candidateFixed = (candidate.indexOf("/")==0)?candidate:"/"+candidate;


    for(let marker of POSSSIBLE_MARKES)
    {
     // log("urlToLocal.debug 2",candidateFixed," marker:",marker);
      const idx = candidateFixed.indexOf(marker);
      const notFoundMarker = idx === -1;
      if (notFoundMarker) {
    //    log("urlToLocal.debug 2.1",candidateFixed," marker:",marker);
        continue;
      }
      let ret = candidateFixed.substring(idx + marker.length); 
     // log("urlToLocal.debug 3",ret,marker);
      if(ret!=candidateFixed ){
   //     log("urlToLocal.debug 4",ret,marker);
        return ret;  
      }
      ret = fixPath(ret);
      if(await exist(ret))
      {
  //       log("urlToLocal.debug 5",ret,marker);
        return ret;
      }
      return candidateFixed;
    }
    
}

async function  tryPath(tryPlace, candidate)
{

  if (!candidate)
  {
    return false;
  }

  if(!candidate.replaceAll)
  {
    console.error("ERROR:tryPath recebeu caminho que não é string",candidate);
    return false;
  }

  let candidateWithStarBar = (candidate.indexOf("/")==0)?candidate:"/"+candidate;

  let ret = tryPlace + candidateWithStarBar; 

  if(await exist(ret))
  {
    log("Caminho ",ret," encontrado pra url");
    return ret;
  }
  log("Caminho ",ret," não encontrado pra url, tentar outro ...");
  return false; 
}

async function fixPath(candidate)
{
  if (!candidate)
  {
    return false;
  }

  printImageDebug("zur",candidate,"2.1");

  if(!candidate.replaceAll)
  {
    console.error("ERROR:fixPath recebeu caminho que não é string",candidate);
    return false;
  }

//  log("fixPath- antes de trocar a extensao ",candidate);
  let ret = trocarExtensao(candidate,"webp"); 
 // log("fixPath- depois de trocar a extensao ",ret);

  printImageDebug("zur",candidate,"2.2");

  for(let path of POSSSIBLE_PLACES)
  {
    const workedPlace = await tryPath(path,ret);
  //  log("fixPath- try ",ret," with:",path," result:",workedPlace);

    if(await exist(workedPlace))
    {
      return workedPlace;
    } 
  } 

  return candidate;
}


async function exist(path) { 
  if (!path)
  {
    return false;
  }

  if(!path.replaceAll)
  {
    console.error("ERROR:exist recebeu caminho que não é string",path);
    return false;
  }
  try {
    if(!path || !(  typeof path === "string"))
    { 
      return false;
    }
    const response = await fetch(path, { method: 'HEAD' }); 
    const ret = response.ok;  
    return ret;
  } catch (e) {  
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

  if(args[0].indexOf("IMPORTANTE!!!!")==0)
  {
    fails++;
  }
  if(args[0].indexOf("vai ser trocada por")>0)
  {
    replaced++;
  }
  if(args[0].indexOf("- existe , então não será trocado")>0)
  {
    alreadyCorrect++;
  } 

//  console.log(prefix + args.map(arg => String(arg)).join(' '));
  console.log(prefix , ...args);
}

function replaceUrlWithRelative(text, urlToReplace, relativePath) {
  // Escapa caracteres especiais para uso em regex
  const escapedUrl = urlToReplace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Cria regex global para todas as ocorrências exatas
  const regex = new RegExp(escapedUrl, 'g');
  // Substitui
  return text.replace(regex, relativePath);
}

function isURL(url) {
  if (!url)
  {
    return false;
  }

  if(!url.replaceAll)
  {
    console.error("ERROR:isURL recebeu caminho que não é string",url);
    return url;
  }
  
  return url.toLowerCase().indexOf('http') === 0;
}


async function fixText(text, urls,item,name){

  if (!text)
  {
    return text;
  }

  if(!text.replaceAll)
  {
    console.error("ERROR:fixText recebeu caminho que não é string",text);
    return text;
  }

  
   for (let url of urls) {
      if(!isImg(url))
      {
        continue;
      }
      if(await exist(url))
      {
         log(`A imagem embutida [${url} - existe , então não será trocado.`);    
         continue;
      }
      url =  trocarExtensao(url,"webp"); 
      const relative = await urlToLocal(url);
      if(await exist(relative))
      {
         log(`A imagem do srcSecondary [${url}]  - vai ser trocada por ${relative}.`);
        
        text =   replaceUrlWithRelative(text, url, relative); 
      }
      else{
      //  log(`A imagem ${relative} do ${name} -  ${item.name}  não existe tentando corrigir.`);
 
        const fixPathRelative= await fixPath(relative);
        if(fixPathRelative===relative)
        {
            log(`IMPORTANTE!!!! A imagem ${relative} do ${name} -  ${item.name}  não existe mesmo.`);
            continue;
        }
         log(`A imagem do srcSecondary [${url}]  - vai ser trocada por ${fixPathRelative}.`);   
        text =   replaceUrlWithRelative(text, url, fixPathRelative);  
      } 
    }
    return text;
}

  
  function isImg(caminho){
  
    if (!caminho)
    {
      return caminho;
    }

    if(!caminho.replaceAll)
    {
      console.error("ERROR: isImg recebeu caminho que não é string",caminho);
      return caminho;
    }


    const extensoesImagem = [
      ".png", ".jpg", ".jpeg", ".bmp", ".gif", ".tiff", ".ico", ".svg",".webp"
    ];

    const caminhoLower = caminho.toLowerCase();
    
    for (const ext of extensoesImagem) {
      if (caminhoLower.substring(caminhoLower.length - ext.length) === ext) {
        return true;
      }
    }

    return false;
  }
  