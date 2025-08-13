import { Injectable } from '@angular/core';
import { global } from '../../global';
import { MessageType ,Message} from '../../message'; 
import { ServiceStatus } from '../../service-status';
import {KeyTool} from "taulukko-commons";

export const EVENT_NEW_MESSAGE =  'new-message';

@Injectable({
  providedIn: 'root'
})
export class MessageBoardService {

  private statusReturn:ServiceStatus = ServiceStatus.STOPPED;
  private id_value:String = new KeyTool().build(1,1);
  
  constructor(){ 
  }

  
  id():String{
    return this.id_value;
  }

  status(status?:ServiceStatus):ServiceStatus{
    if(status)
    {
      this.statusReturn = status;
    }
    return this.statusReturn;
  }

  show(text: string, type: MessageType = MessageType.info, duration = 0): void {
    const data:Message =  new Message ( text,  duration,type) ; 
    global.eventManager.publish({
      name:EVENT_NEW_MESSAGE,data});
  }

  clear(): void {
    global.eventManager.publish({
      name:EVENT_NEW_MESSAGE,data: undefined});
  }

  stop(){
      this.status(ServiceStatus.STOPPED);
      console.log("Status do gerenciador depois do announcement finalizado " +ServiceStatus.STOPPED);
  }
}
