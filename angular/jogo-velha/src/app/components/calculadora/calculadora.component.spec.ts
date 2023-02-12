import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraComponent } from './calculadora.component';

describe('CalculadoraComponent', () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculadoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should 2+3=5', () => {
    const fixture = TestBed.createComponent(CalculadoraComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const btn3:HTMLButtonElement = compiled.querySelector('.btn3') as HTMLButtonElement;
    const btn2:HTMLButtonElement = compiled.querySelector('.btn2') as HTMLButtonElement;
    const btnPlus:HTMLButtonElement = compiled.querySelector('.btnPlus') as HTMLButtonElement;
    const btnCalc:HTMLButtonElement = compiled.querySelector('.btnCalc') as HTMLButtonElement;
    const display:HTMLButtonElement = compiled.querySelector('.display') as HTMLButtonElement;
    btn3.click();
    fixture.detectChanges();
    btnPlus.click();
    fixture.detectChanges();
    btn2.click();
    fixture.detectChanges();
    btnCalc.click();
    fixture.detectChanges();

    expect(display.value).toContain('5');
  });

});
