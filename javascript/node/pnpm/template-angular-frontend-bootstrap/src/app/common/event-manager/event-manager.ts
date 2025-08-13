
import { Injectable } from "@angular/core";
import { SubscribeFunction,EventData } from "./";
import { EventEmitter } from "events";

@Injectable({
  providedIn: 'root' 
})
export class EventManager {
  private subjects:EventEmitter = new EventEmitter();
  public publish(event:EventData){
    console.log("Evento publicado pelo EventManager: ", event);
    this.subjects.emit(event.name,event);
  }
  public subscribe(eventName:string,listenner:SubscribeFunction):void{
     this.subjects.on(eventName,listenner);
  }
}