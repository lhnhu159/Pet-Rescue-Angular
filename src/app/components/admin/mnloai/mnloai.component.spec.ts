import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnloaiComponent } from './mnloai.component';

describe('MnloaiComponent', () => {
  let component: MnloaiComponent;
  let fixture: ComponentFixture<MnloaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnloaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnloaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
