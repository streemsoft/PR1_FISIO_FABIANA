import { TestBed, inject } from '@angular/core/testing';

import { ServicoFireService } from './servico-fire.service';

describe('ServicoFireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoFireService]
    });
  });

  it('should be created', inject([ServicoFireService], (service: ServicoFireService) => {
    expect(service).toBeTruthy();
  }));
});
