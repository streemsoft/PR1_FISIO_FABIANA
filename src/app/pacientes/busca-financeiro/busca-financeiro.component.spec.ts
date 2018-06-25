import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaFinanceiroComponent } from './busca-financeiro.component';

describe('BuscaFinanceiroComponent', () => {
  let component: BuscaFinanceiroComponent;
  let fixture: ComponentFixture<BuscaFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaFinanceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
