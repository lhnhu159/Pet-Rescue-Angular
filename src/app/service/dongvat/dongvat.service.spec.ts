import { TestBed } from '@angular/core/testing';

import { DongvatService } from './dongvat.service';

describe('DongvatService', () => {
  let service: DongvatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DongvatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
