import { Component, ViewEncapsulation } from '@angular/core';
import { Message } from "../../message"
import { MessageBoardService, EVENT_NEW_MESSAGE } from './message-board.service';
import { MessageBoardModule } from "./message-board.module";
import { EventData } from '../../event-manager';
import { ServiceStatus } from '../../service-status';
import { global } from '../../global';
import { AnnouncementModule } from '../announcement/announcement.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-board',
  imports: [CommonModule, MessageBoardModule, MessageBoardModule, AnnouncementModule],
  templateUrl: './message-board.component.html',
  styleUrl: './message-board.component.scss'
})
export class MessageBoardComponent {
  public messages: Map<string, Message> = new Map();
  public classes: string = "info hide";

  constructor(private messageBoardService: MessageBoardService) {
  }

  ngOnInit(): void {
    const subscribe = (value: EventData): void => {
      console.log("Message board subscribe " + value);

      const message: Message = value.data as Message;


      if (!message || !message.text || message.text.length == 0) {
        return;
      }

      this.messages.set(message.id, message);

      this.classes = "messageboard " + message.name + " show";

      if(message.duration && message.duration>0)
      {
        setTimeout(()=>{
          this.closeMessage(message.id);
        },message.duration)
      }

    };
    //console.log("subscrevendo os eventos de anúncio");
    global.eventManager.subscribe(EVENT_NEW_MESSAGE, subscribe);
    this.messageBoardService.status(ServiceStatus.STARTED);
    console.log("Status do gerenciador depois do message-board criado " + this.messageBoardService.status());
  }

  public get visible() {
    return this.messages.size > 0;
  }

  closeMessage(id: string) {
    this.messages.delete(id);
  }

}
