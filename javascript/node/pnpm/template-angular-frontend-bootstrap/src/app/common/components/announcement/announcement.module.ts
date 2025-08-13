import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { AnnouncementService } from './announcement.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,AnnouncementComponent
  ],
  exports:[AnnouncementComponent],
  providers: [
      AnnouncementService
  ] 
})
export class AnnouncementModule { 
  
}