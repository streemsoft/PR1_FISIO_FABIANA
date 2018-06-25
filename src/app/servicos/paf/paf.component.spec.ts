import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PafComponent } from './paf.component';

describe('PafComponent', () => {
  let component: PafComponent;
  let fixture: ComponentFixture<PafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
