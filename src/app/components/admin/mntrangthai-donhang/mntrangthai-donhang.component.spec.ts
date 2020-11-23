import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MntrangthaiDonhangComponent } from './mntrangthai-donhang.component';

describe('MntrangthaiDonhangComponent', () => {
  let component: MntrangthaiDonhangComponent;
  let fixture: ComponentFixture<MntrangthaiDonhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntrangthaiDonhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntrangthaiDonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
