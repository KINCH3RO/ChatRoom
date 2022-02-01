import { TestBed } from '@angular/core/testing';

import { UnreadMessagesService } from './unread-messages.service';

describe('UnreadMessagesService', () => {
  let service: UnreadMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnreadMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
