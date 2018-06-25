import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaAtendimentoComponent } from './busca-atendimento.component';

describe('BuscaAtendimentoComponent', () => {
  let component: BuscaAtendimentoComponent;
  let fixture: ComponentFixture<BuscaAtendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaAtendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
