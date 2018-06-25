import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendRouterComponent } from './atend-router.component';

describe('AtendRouterComponent', () => {
  let component: AtendRouterComponent;
  let fixture: ComponentFixture<AtendRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
