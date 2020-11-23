import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnchudebaidangComponent } from './mnchudebaidang.component';

describe('MnchudebaidangComponent', () => {
  let component: MnchudebaidangComponent;
  let fixture: ComponentFixture<MnchudebaidangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnchudebaidangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnchudebaidangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
