import { TestBed } from '@angular/core/testing';

import { ChannelsMetaService } from './channels-meta.service';

describe('ChannelsMetaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelsMetaService = TestBed.get(ChannelsMetaService);
    expect(service).toBeTruthy();
  });
});
