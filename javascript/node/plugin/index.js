 

import("./plugins/test/index.js").then((module) => {
    console.log(module.default);
    module.default("teste");
 });

 setTimeout( ()=>{
    //se quiser que nao cacheie, posso fazer igual na web
    import("./plugins/test/index.js?v=1").then((module) => {
        console.log(module.default);
        module.default("teste");
     });
    
 },10000);

