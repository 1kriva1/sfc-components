import { TestBed } from '@angular/core/testing';

import { SfcSchemeModalService } from './sfc-scheme-modal.service';

describe('SfcSchemeModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SfcSchemeModalService = TestBed.get(SfcSchemeModalService);
    expect(service).toBeTruthy();
  });
});
