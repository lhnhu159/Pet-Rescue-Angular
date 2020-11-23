import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnhinhthucUnghoComponent } from './mnhinhthuc-ungho.component';

describe('MnhinhthucUnghoComponent', () => {
  let component: MnhinhthucUnghoComponent;
  let fixture: ComponentFixture<MnhinhthucUnghoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnhinhthucUnghoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnhinhthucUnghoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
