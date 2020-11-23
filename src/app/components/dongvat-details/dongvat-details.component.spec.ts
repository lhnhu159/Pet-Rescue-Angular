import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DongvatDetailsComponent } from './dongvat-details.component';

describe('DongvatDetailsComponent', () => {
  let component: DongvatDetailsComponent;
  let fixture: ComponentFixture<DongvatDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DongvatDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DongvatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
