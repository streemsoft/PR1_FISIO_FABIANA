import { TestBed, inject } from '@angular/core/testing';

import { AgendamentoFireService } from './agendamento-fire.service';

describe('AgendamentoFireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgendamentoFireService]
    });
  });

  it('should be created', inject([AgendamentoFireService], (service: AgendamentoFireService) => {
    expect(service).toBeTruthy();
  }));
});
