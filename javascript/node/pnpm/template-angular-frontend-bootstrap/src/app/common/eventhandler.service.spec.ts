import { TestBed } from '@angular/core/testing';

import { EventhandlerService } from './eventhandler.service';

describe('EventhandlerService', () => {
  let service: EventhandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventhandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
