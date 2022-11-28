import { TestBed } from '@angular/core/testing';

import { AvailTimeService } from './avail-time.service';

describe('AvailTimeService', () => {
  let service: AvailTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
