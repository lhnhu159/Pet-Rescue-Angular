import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TintucDetailsComponent } from './tintuc-details.component';

describe('TintucDetailsComponent', () => {
  let component: TintucDetailsComponent;
  let fixture: ComponentFixture<TintucDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TintucDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TintucDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
