import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageBoardComponent } from '../components/message-board/message-board.component';
import { AnnouncementModule } from '../components/announcement/announcement.module'; 
 

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    ReactiveFormsModule,MessageBoardComponent,AnnouncementModule
  ],
  exports:[ CommonModule, 
    ReactiveFormsModule,MessageBoardComponent,AnnouncementModule]
})
export class ShareModule { 
  private static _cache:Map<string,string> = new Map<string,string>();
  constructor(){
    console.log("ShareModule constructor"); 
  }
  static get cache():Map<string,string>{
    return ShareModule._cache;
  }
 }
