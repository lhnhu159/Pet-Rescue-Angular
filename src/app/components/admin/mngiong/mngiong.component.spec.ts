import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngiongComponent } from './mngiong.component';

describe('MngiongComponent', () => {
  let component: MngiongComponent;
  let fixture: ComponentFixture<MngiongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngiongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngiongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
