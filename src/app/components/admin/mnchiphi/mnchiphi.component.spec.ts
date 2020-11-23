import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnchiphiComponent } from './mnchiphi.component';

describe('MnchiphiComponent', () => {
  let component: MnchiphiComponent;
  let fixture: ComponentFixture<MnchiphiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnchiphiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnchiphiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
