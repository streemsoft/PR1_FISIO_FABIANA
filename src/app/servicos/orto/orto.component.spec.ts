import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrtoComponent } from './orto.component';

describe('OrtoComponent', () => {
  let component: OrtoComponent;
  let fixture: ComponentFixture<OrtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
