import { TestBed } from '@angular/core/testing';

import { PasswordUpdateService } from './password-update.service';

describe('PasswordUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordUpdateService = TestBed.get(PasswordUpdateService);
    expect(service).toBeTruthy();
  });
});
