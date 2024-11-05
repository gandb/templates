export interface MessageData{
  timeoutSeconds?:number;
  type?:MessageDataType;
  message:string;
}


export enum MessageDataType{
  INFO=1,
  ERROR=2,
  WARNING=3
}
