import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { ContactService } from '../pages/contact/contact.service';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

 beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [AppComponent ],
      providers:[provideRouter([]),],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  }); 

  it('should create the app', () => { 
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Memorial Francisco Grossi' title`, () => {   
    const app = fixture.componentInstance; 
    expect(app.title).toEqual('Memorial Francisco Grossi');
  });

 
  it(`should have the menu Home`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.home-link');
    expect(anchorElement.textContent).toContain('Página Inicial'); 
  });

  
  it(`should have the menu Biograph`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.bio-link');
    expect(anchorElement.textContent).toContain('Biografia'); 
  });
    
  it(`should have the menu Galery`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.link-galery');
    expect(anchorElement.textContent).toContain('Galeria de Fotos'); 
  });

  it(`should have the menu Testimonials`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.link-testimonials');
    expect(anchorElement.textContent).toContain('Depoimentos'); 
  });  
  
  it(`should have the menu Achievements`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.link-achievements');
    expect(anchorElement.textContent).toContain('Prêmios e Conquistas'); 
  });

    
  it(`should have the menu Personal Page`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.link-private-page');
    expect(anchorElement.textContent).toContain('Página Pessoal no IME'); 
  });
    
  it(`should have the menu Quotes`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.link-quotes');
    expect(anchorElement.textContent).toContain('Frases e Reflexões'); 
  }); 

  it(`should have the menu Contact`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.link-contact');
    expect(anchorElement.textContent).toContain('Contato e Contribuições'); 
  }); 

  it(`should have the correctly title`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.memorial-title');
    expect(anchorElement.textContent).toContain('Memorial Professor Grossi'); 
  }); 

  it(`should have the correctly rights`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.rights');
    expect(anchorElement.textContent).toContain('2025 Memorial Professor Grossi'); 
  }); 

  
  
});
