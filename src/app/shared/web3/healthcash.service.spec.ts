import { TestBed, inject } from '@angular/core/testing';

import { HealthcashService } from './healthcash.service';

describe('HealthcashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthcashService]
    });
  });

  it('should be created', inject([HealthcashService], (service: HealthcashService) => {
    expect(service).toBeTruthy();
  }));
});
