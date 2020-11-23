import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MndonhangComponent } from './mndonhang.component';

describe('MndonhangComponent', () => {
  let component: MndonhangComponent;
  let fixture: ComponentFixture<MndonhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MndonhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MndonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
