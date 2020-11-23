import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngroupComponent } from './mngroup.component';

describe('MngroupComponent', () => {
  let component: MngroupComponent;
  let fixture: ComponentFixture<MngroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
