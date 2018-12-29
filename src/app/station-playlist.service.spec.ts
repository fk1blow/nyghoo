import { TestBed } from '@angular/core/testing';

import { StationPlaylistService } from './station-playlist.service';

describe('StationPlaylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationPlaylistService = TestBed.get(StationPlaylistService);
    expect(service).toBeTruthy();
  });
});
