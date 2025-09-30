import { Component, OnInit } from '@angular/core';
import { DateService } from './services/date.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <h1>{{ pageTitle }}</h1>
      <p>Esta página foi renderizada no servidor com a data de hoje!</p>
      <p>Data atual: {{ currentDate }}</p>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #1976d2;
    }
  `]
})
export class AppComponent implements OnInit {
  pageTitle = 'Hello World - Angular SSR';
  currentDate: string = '';

  constructor(
    private dateService: DateService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    // Define o título da página com a data atual
    this.currentDate = this.dateService.getCurrentDate();
    const titleWithDate = `${this.pageTitle} - ${this.currentDate}`;
    
    this.titleService.setTitle(titleWithDate);
    
    // Adiciona meta tags para SEO
    this.metaService.addTags([
      { name: 'description', content: `Página renderizada no servidor em ${this.currentDate}` },
      { name: 'author', content: 'Angular SSR Demo' }
    ]);
  }
}