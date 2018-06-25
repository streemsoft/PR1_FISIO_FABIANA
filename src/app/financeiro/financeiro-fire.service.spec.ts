import { TestBed, inject } from '@angular/core/testing';

import { FinanceiroFireService } from './financeiro-fire.service';

describe('FinanceiroFireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceiroFireService]
    });
  });

  it('should be created', inject([FinanceiroFireService], (service: FinanceiroFireService) => {
    expect(service).toBeTruthy();
  }));
});
