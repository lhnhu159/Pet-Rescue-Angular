import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MntintucComponent } from './mntintuc.component';

describe('MntintucComponent', () => {
  let component: MntintucComponent;
  let fixture: ComponentFixture<MntintucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntintucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
