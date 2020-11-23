import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnhinhanhComponent } from './mnhinhanh.component';

describe('MnhinhanhComponent', () => {
  let component: MnhinhanhComponent;
  let fixture: ComponentFixture<MnhinhanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnhinhanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnhinhanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
