import { TestBed, inject } from '@angular/core/testing';

import { PacientesFireService } from './pacientes-fire.service';

describe('PacientesFireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PacientesFireService]
    });
  });

  it('should be created', inject([PacientesFireService], (service: PacientesFireService) => {
    expect(service).toBeTruthy();
  }));
});
