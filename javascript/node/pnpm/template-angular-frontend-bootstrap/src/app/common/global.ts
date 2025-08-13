import { Injectable } from '@angular/core';
import { EventManager } from './event-manager';

@Injectable({
  providedIn: 'root',
})
export class Global {

  private static _eventManager:EventManager = new EventManager();

  public get eventManager():EventManager{
    return Global._eventManager;
  }
}

export const global:Global = new Global();

