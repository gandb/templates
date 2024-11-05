import { NgFor , NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { Global } from '../../commmon/global';
import { EventData } from '../../commmon/event-manager'
import { MessageData, MessageDataType } from './message-data';

/***
 * Eg use:
 * @Component({
  ...
  providers: [Global],
 ...
})
 ....
  constructor(private router: Router, global:Global ) {
      this._global = global;
  }
      ....
 *  const data:MessageData = {message:"testeA"};
    this._global.eventManager.publish({name:GlobalMessageComponent.EVENT_GLOBAL_MESSAGE,data})
    const data2:MessageData = {message:"testeB",type:MessageDataType.WARNING,timeoutSeconds:5};
    this._global.eventManager.publish({name:GlobalMessageComponent.EVENT_GLOBAL_MESSAGE,data:data2})
 */

@Component({
  selector: 'global-messages',
  standalone: true,
  imports: [NgFor,NgIf],
  providers: [Global],
  templateUrl: './global-message.component.html',
  styleUrl: './global-message.component.scss'
})
export class GlobalMessageComponent {
  private static _messages:Array<MessageData>=new Array();
  private _global:Global;
  private static _subscribed:boolean = false;
  private static _show=false;
  private static _previousHandle:any=false;

  constructor( global:Global){
    this._global = global;
    if(GlobalMessageComponent._subscribed)
    {
      return;
    }
    this.subscribeGlobalMessage();

  }

  public isMessageError(message:MessageData)
  {
    return message && message.type && message.type == MessageDataType.ERROR;
  }

  public isMessageWarning(message:MessageData)
  {
    return message && message.type && message.type == MessageDataType.WARNING;
  }

  public isMessageInfo(message:MessageData)
  {
    return !message  || !message.type || message.type == MessageDataType.INFO;
  }

  private subscribeGlobalMessage() {
    GlobalMessageComponent._subscribed = true;
    this._global.eventManager.subscribe(GlobalMessageComponent.EVENT_GLOBAL_MESSAGE, (event: EventData) => {
      const data: MessageData = event.data as MessageData;
      GlobalMessageComponent._messages.push(data);
      GlobalMessageComponent._show = true;
      console.log("mensagem", event, "messages", GlobalMessageComponent._messages);
      if (data.timeoutSeconds) {
        if (GlobalMessageComponent._previousHandle) {
          clearTimeout(GlobalMessageComponent._previousHandle);
          GlobalMessageComponent._previousHandle = false;
        }
        GlobalMessageComponent._previousHandle = setTimeout(() => {
          this.onClose();
        }, data.timeoutSeconds * 1000);
      }

    });
  }

  public static get EVENT_GLOBAL_MESSAGE():string{
    return "ui.message";
  }

  public get messages():Array<MessageData>{
    return GlobalMessageComponent._messages;
  }
  public get show():boolean{
    return GlobalMessageComponent._show;
  }
  public  onClose() {
    GlobalMessageComponent._show=false;
    GlobalMessageComponent._previousHandle=false;
    GlobalMessageComponent._messages.splice(0, GlobalMessageComponent._messages.length);
  }
}
