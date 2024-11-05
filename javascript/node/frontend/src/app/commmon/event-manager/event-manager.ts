
import { SubscribeFunction,EventData } from "./";
import { EventEmitter } from "events";

export class EventManager {
  private subjects:EventEmitter = new EventEmitter();
  public publish(event:EventData){
    this.subjects.emit(event.name,event);
  }
  public subscribe(eventName:string,listenner:SubscribeFunction):void{
     this.subjects.on(eventName,listenner);
  }
}




