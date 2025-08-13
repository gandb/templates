import { Component } from '@angular/core';
import { global } from '../../global';
import { EventData } from '../../event-manager';
import { Message } from '../../message';
import { MessageType } from '../../message/message-type';
import { AnnouncementService, EVENT_ANNOUNCEMENT } from './announcement.service';
import { ServiceStatus } from '../../service-status';

@Component({
  selector: 'app-announcement',
  imports: [],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent {

  public message: Message | undefined;
  public classes: string = "info hide";
  public visible: boolean = false;

  constructor(private announcement: AnnouncementService) {
  }

  ngOnInit(): void {
    const subscribe = (value: EventData): void => {

      //console.log("Anúncio recebido: ", value);
      this.message = value.data as Message;

      if (!this.message || !this.message.text || this.message.text.length == 0) {
        this.fechar();
        return;
      }

      if (!this.message.duration) {
        console.error("The message has no defined duration.");
        this.fechar();
        return;

      }

      this.visible = true;


      this.classes = "announcement " + this.mapTypeToClass(this.message.type) + " show";

    };
    //console.log("subscrevendo os eventos de anúncio");
    global.eventManager.subscribe(EVENT_ANNOUNCEMENT, subscribe);
    this.announcement.status(ServiceStatus.STARTED);
    console.log("Manager status after the announcement was created : " + this.announcement.status());
  }

  fechar() {
    this.visible = false;
    this.message = undefined;
    this.classes = "announcement hide";
  }

  mapTypeToClass(type: MessageType): string {
    switch (type) {
      case MessageType.error: return 'danger';
      case MessageType.warn: return 'warning';
      case MessageType.success: return 'success';
      case MessageType.info: return 'info';
      default: throw new Error("Error! This type isnt expected");
    }
  }
}
