import { TestBed } from '@angular/core/testing';

import { MessageBoardService } from './message-board.service';

describe('MessageBoardService', () => {
  let service: MessageBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
