import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletosComponent } from './boletos.component';

describe('BoletosComponent', () => {
  let component: BoletosComponent;
  let fixture: ComponentFixture<BoletosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
