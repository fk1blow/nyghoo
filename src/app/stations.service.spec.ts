import { TestBed } from '@angular/core/testing';

import { StationsService } from './stations.service';

describe('StationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationsService = TestBed.get(StationsService);
    expect(service).toBeTruthy();
  });
});
