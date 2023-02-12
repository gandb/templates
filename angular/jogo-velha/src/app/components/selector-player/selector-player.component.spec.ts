import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPlayerComponent } from './selector-player.component';

describe('SelectorPlayerComponent', () => {
  let component: SelectorPlayerComponent;
  let fixture: ComponentFixture<SelectorPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
