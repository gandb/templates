import { TestBed } from '@angular/core/testing';
import { CalculadoraService } from './calculadora.service';
describe('CalculadoraService', () => {
  let service: CalculadoraService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be 2+3=5', () => {
    expect(service.calculateNumbers('2','3','+')).toBe(5);
  });
});
