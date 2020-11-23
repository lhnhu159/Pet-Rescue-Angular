import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhannuoiComponent } from './nhannuoi.component';

describe('NhannuoiComponent', () => {
  let component: NhannuoiComponent;
  let fixture: ComponentFixture<NhannuoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhannuoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhannuoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
