import { TestBed } from '@angular/core/testing';

import { AdvertisementService } from './advertisement.service';

describe('AdvertisementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvertisementService = TestBed.get(AdvertisementService);
    expect(service).toBeTruthy();
  });
});
