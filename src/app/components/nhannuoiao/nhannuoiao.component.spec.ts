import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhannuoiaoComponent } from './nhannuoiao.component';

describe('NhannuoiaoComponent', () => {
  let component: NhannuoiaoComponent;
  let fixture: ComponentFixture<NhannuoiaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhannuoiaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhannuoiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
