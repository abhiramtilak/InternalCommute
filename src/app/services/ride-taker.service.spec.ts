import { TestBed } from '@angular/core/testing';

import { RideTakerService } from './ride-taker.service';

describe('RideTakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RideTakerService = TestBed.get(RideTakerService);
    expect(service).toBeTruthy();
  });
});
