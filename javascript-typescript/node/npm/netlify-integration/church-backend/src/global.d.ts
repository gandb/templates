// Declara o valor global que o Foundry injeta em runtime
declare const Hooks: {
  on(event: string, callback: (...args: unknown[]) => void): number;
  once(event: string, callback: (...args: unknown[]) => void): number;
  off(event: string, callback: (...args: unknown[]) => void): number;
  call(event: string, ...args: unknown[]): unknown;
  callAll(event:string, ...args: unknown[]): unknown;
};
   
namespace foundry {
    namespace applications {
      namespace api {
        class DialogV2 {
          constructor(options?: DialogV2Options);
          public render(options:any);
        
        }
        interface DialogV2Options {
          // tipos das opções
        }
      }
    }
  }
 
declare interface EventLambda {
    public httpMethod:"POST"|"GET"|"PUT"|"DELETE"|"OPTIONS";
}
 