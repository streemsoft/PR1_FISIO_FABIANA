import { TestBed, inject } from '@angular/core/testing';

import { AtendimentoFireService } from './atendimento-fire.service';

describe('AtendimentoFireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtendimentoFireService]
    });
  });

  it('should be created', inject([AtendimentoFireService], (service: AtendimentoFireService) => {
    expect(service).toBeTruthy();
  }));
});
