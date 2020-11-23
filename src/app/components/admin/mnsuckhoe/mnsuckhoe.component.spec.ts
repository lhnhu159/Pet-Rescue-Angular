import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnsuckhoeComponent } from './mnsuckhoe.component';

describe('MnsuckhoeComponent', () => {
  let component: MnsuckhoeComponent;
  let fixture: ComponentFixture<MnsuckhoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnsuckhoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnsuckhoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
