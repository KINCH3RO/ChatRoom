import { TestBed } from '@angular/core/testing';

import { MicInputService } from './mic-input.service';

describe('MicInputService', () => {
  let service: MicInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
