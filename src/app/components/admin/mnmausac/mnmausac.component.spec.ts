import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmausacComponent } from './mnmausac.component';

describe('MnmausacComponent', () => {
  let component: MnmausacComponent;
  let fixture: ComponentFixture<MnmausacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmausacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmausacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
