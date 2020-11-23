import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnhoatdongtinhnguyenComponent } from './mnhoatdongtinhnguyen.component';

describe('MnhoatdongtinhnguyenComponent', () => {
  let component: MnhoatdongtinhnguyenComponent;
  let fixture: ComponentFixture<MnhoatdongtinhnguyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnhoatdongtinhnguyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnhoatdongtinhnguyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
