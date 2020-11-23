import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnhinhthucThanhtoanComponent } from './mnhinhthuc-thanhtoan.component';

describe('MnhinhthucThanhtoanComponent', () => {
  let component: MnhinhthucThanhtoanComponent;
  let fixture: ComponentFixture<MnhinhthucThanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnhinhthucThanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnhinhthucThanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
