import { TestBed } from '@angular/core/testing';

import { DisputeService } from './dispute.service';

describe('DisputeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisputeService = TestBed.get(DisputeService);
    expect(service).toBeTruthy();
  });
});
