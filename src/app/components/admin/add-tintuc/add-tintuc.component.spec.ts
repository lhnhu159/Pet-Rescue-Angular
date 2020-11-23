import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTintucComponent } from './add-tintuc.component';

describe('AddTintucComponent', () => {
  let component: AddTintucComponent;
  let fixture: ComponentFixture<AddTintucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTintucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
