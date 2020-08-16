import { TestBed } from '@angular/core/testing';

import { ProfileservicesService } from './profileservices.service';

describe('ProfileservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileservicesService = TestBed.get(ProfileservicesService);
    expect(service).toBeTruthy();
  });
});
