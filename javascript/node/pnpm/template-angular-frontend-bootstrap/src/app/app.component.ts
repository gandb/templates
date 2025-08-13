import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';
import { ShareModule } from './common/share/share.module'; 
import { AnnouncementService } from './common/components/announcement/announcement.service';
import { AnnouncementModule } from './common/components/announcement/announcement.module';
import { MessageType } from './common/message';
import { ServiceStatus } from './common/service-status';
import { MessageBoardModule } from './common/components/message-board/message-board.module';
import { MessageBoardService } from './common/components/message-board/message-board.service';

 

@Component({
  selector: 'app-root',
  imports: [RouterModule,ShareModule,AnnouncementModule,MessageBoardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Memorial Francisco Grossi';
  constructor(private router: Router,private announcement: AnnouncementService,private messageBoard:MessageBoardService) { 
  }
 
  ngOnInit() {
    
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) ,// Filtra apenas os eventos NavigationEnd
        map(event =>  event as NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
       
        if( event.urlAfterRedirects.indexOf("original")!=-1)
        {
          this.goToOriginalSite(); 
          return;
        }  
        this.returnTheDefaultState(); 
       
      });
      console.log("iniciando o app");
      const handle = setInterval(() => {
        console.log("Anúncio iniciado aguardando o gerenciador, status atual: " + this.announcement.status());
        if(this.announcement.status() === ServiceStatus.STARTED)
        {
          console.log("Anúncio iniciado");
          this.announcement.show("Este é um exemplo de anúncio!",MessageType.warn,  5000);
          clearInterval(handle);
        }
        if(this.messageBoard.status() === ServiceStatus.STARTED)
        {
          console.log("Message Board iniciado");
          this.messageBoard.show("Este é um exemplo de anúncio 1!",MessageType.warn,  5000);
           this.messageBoard.show("Este é um exemplo de anúncio 2!",MessageType.warn);
          clearInterval(handle);
        }
      },300); 
     
  }

  
goToOriginalSite() {
  const body: Element = document.querySelector("body") as Element;
  body.classList.remove("default-page");
  body.classList.add("personal-page-original");
}

returnTheDefaultState() {
  const body: Element = document.querySelector("body") as Element;
  body.classList.remove("personal-page-original");
  body.classList.add("default-page");

}
 

}
