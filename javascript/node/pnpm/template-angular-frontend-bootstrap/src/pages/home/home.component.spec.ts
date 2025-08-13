import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => { 
  let fixture: ComponentFixture<HomeComponent>;



  beforeEach(async () => {
     
     await TestBed.configureTestingModule({
       imports: [HomeComponent ],
       providers:[provideRouter([]),],
     }).compileComponents();
 
     fixture = TestBed.createComponent(HomeComponent);
     fixture.detectChanges();
   }); 
  
  it('should create', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  
  it(`should have the name of professor`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.name');
    expect('Francisco A. Grossi').toContain(stringNeverNull(anchorElement.textContent)); 
  });

  it(`should have the born and death date`, () => {  
    const anchorElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.born-and-death');
    expect("☼1943~2016†").toContain(stringNeverNull(anchorElement.textContent)); 
  });

  it('should load the image correctly', (done) => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('.picture');
    expect(img).toBeTruthy();  
    
    img.onload = () => {
      expect(true).toBeTruthy(); 
      done();
    };

    img.onerror = () => {
      fail('A imagem não foi carregada corretamente');
      done();
    };
  });
  
  
});

function stringNeverNull(value:string|null)
{
  return (value)?value:"";
}