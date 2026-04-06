import { KeyTool } from "taulukko-commons";

export abstract class BaseDAO {
   keyTool: KeyTool = new KeyTool();
   
 
   public generateNewID():string{
        const id:string = this.keyTool.build(1, 1);
        return id;
   } 
}