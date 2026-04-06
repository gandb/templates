import { Handler } from "../pool.js";

export class SingleColumnHander<T> implements Handler<T> {
  columnName: string;

  constructor(columnName: string  ) {
    this.columnName = columnName;
  }
  
  convert(ret: Array<any> | any): Promise<T> {
 
    console.log("SingleColumnHander.convert",ret);
    
    return ret[0][this.columnName];
  } 
}