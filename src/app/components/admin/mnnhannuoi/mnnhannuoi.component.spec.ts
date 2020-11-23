import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnnhannuoiComponent } from './mnnhannuoi.component';

describe('MnnhannuoiComponent', () => {
  let component: MnnhannuoiComponent;
  let fixture: ComponentFixture<MnnhannuoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnnhannuoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnnhannuoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
