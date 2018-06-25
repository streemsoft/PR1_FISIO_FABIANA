import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaAgendComponent } from './busca-agend.component';

describe('BuscaAgendComponent', () => {
  let component: BuscaAgendComponent;
  let fixture: ComponentFixture<BuscaAgendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaAgendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaAgendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
