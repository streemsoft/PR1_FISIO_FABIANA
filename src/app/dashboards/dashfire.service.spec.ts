import { TestBed, inject } from '@angular/core/testing';

import { DashfireService } from './dashfire.service';

describe('DashfireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashfireService]
    });
  });

  it('should be created', inject([DashfireService], (service: DashfireService) => {
    expect(service).toBeTruthy();
  }));
});
