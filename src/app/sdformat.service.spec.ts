import { TestBed, inject } from '@angular/core/testing';

import { SdformatService } from './sdformat.service';

describe('SdformatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SdformatService]
    });
  });

  it('should be created', inject([SdformatService], (service: SdformatService) => {
    expect(service).toBeTruthy();
  }));
});
