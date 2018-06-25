import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacoComponent } from './paco.component';

describe('PacoComponent', () => {
  let component: PacoComponent;
  let fixture: ComponentFixture<PacoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
