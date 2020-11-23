import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MndiendanComponent } from './mndiendan.component';

describe('MndiendanComponent', () => {
  let component: MndiendanComponent;
  let fixture: ComponentFixture<MndiendanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MndiendanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MndiendanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
