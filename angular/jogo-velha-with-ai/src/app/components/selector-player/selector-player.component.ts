import { Component, Output, EventEmitter } from '@angular/core';
import { SelectorPlayerEventOnChange } from './seletor-player-event-on-change';

@Component({
  selector: 'app-selector-player',
  templateUrl: './selector-player.component.html',
  styleUrls: ['./selector-player.component.scss']
})
export class SelectorPlayerComponent {
  @Output()
  change = new EventEmitter<SelectorPlayerEventOnChange>();
  onSelPlayer(event:Event){
    this.change.emit({players:parseInt((event.target as HTMLInputElement).value)});
  }
}
