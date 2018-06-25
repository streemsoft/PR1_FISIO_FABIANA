import { TestBed, async, inject } from '@angular/core/testing';

import { KeypacGuard } from './keypac.guard';

describe('KeypacGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeypacGuard]
    });
  });

  it('should ...', inject([KeypacGuard], (guard: KeypacGuard) => {
    expect(guard).toBeTruthy();
  }));
});
