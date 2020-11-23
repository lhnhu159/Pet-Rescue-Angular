import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MndongvatComponent } from './mndongvat.component';

describe('MndongvatComponent', () => {
  let component: MndongvatComponent;
  let fixture: ComponentFixture<MndongvatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MndongvatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MndongvatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
