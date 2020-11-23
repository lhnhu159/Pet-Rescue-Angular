import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnghoComponent } from './ungho.component';

describe('UnghoComponent', () => {
  let component: UnghoComponent;
  let fixture: ComponentFixture<UnghoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnghoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnghoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
