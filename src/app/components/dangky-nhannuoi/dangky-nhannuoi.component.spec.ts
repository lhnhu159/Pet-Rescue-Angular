import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkyNhannuoiComponent } from './dangky-nhannuoi.component';

describe('DangkyNhannuoiComponent', () => {
  let component: DangkyNhannuoiComponent;
  let fixture: ComponentFixture<DangkyNhannuoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangkyNhannuoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkyNhannuoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
