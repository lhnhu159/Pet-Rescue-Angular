import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnunghoComponent } from './mnungho.component';

describe('MnunghoComponent', () => {
  let component: MnunghoComponent;
  let fixture: ComponentFixture<MnunghoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnunghoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnunghoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
