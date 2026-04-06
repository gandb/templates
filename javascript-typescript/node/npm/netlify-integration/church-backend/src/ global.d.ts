


declare class Request{
    headers: Map<string, string >;
};

declare class Response{
    constructor(body:string, init?:ResponseInit);
};

/*apenas exemplos
 
declare const CONFIG = {
    debug:{
        hooks:boolean
    }
};


namespace CONST{
    namespace KEYBINDING_PRECEDENCE{
        var NORMAL:any;
    }
};

namespace foundry {
    namespace applications {
       
        class DialogV2 {
            constructor(options?: DialogV2Options);
            public render(options:any);
        
        }
        interface DialogV2Options {
            // tipos das opções
        }
    }
    
  }
 */