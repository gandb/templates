import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
 
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser'; 

@Component({
  imports:[ModalComponent],
  template: `
  <div class="test">
    <app-modal >
       Conteúdo do modal
    </app-modal>
  </div>
  `,
})
class TestHostComponent {
  status = false; 
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  
  let componentTest: TestHostComponent;
  let fixtureTest: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent,TestHostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixtureTest = TestBed.createComponent(TestHostComponent);
    componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 

  it('não deve exibir o modal quando status for false', () => {
    component.hide();
    fixture.detectChanges(); // Atualiza a view
    const modalElement = fixture.debugElement.query(By.css('app-modal'));
    expect(modalElement).toBeFalsy();
  });

  it('deve exibir o modal quando chamado o show', () => {
    component.show();  
    fixture.detectChanges();
    const modalElement = fixture.debugElement.query(By.css('.modal-component-content'));
    expect(modalElement).toBeTruthy();
  });
 
  it('deve chamar toggle() ao clicar na overlay', () => {
    spyOn(component, 'toggle');
    component.show(); // Ativa o modal
    fixture.detectChanges();
    
    const overlay = fixture.debugElement.query(By.css('.overlay'));
    overlay.nativeElement.click();

    expect(component.toggle).toHaveBeenCalled();
  });
});
