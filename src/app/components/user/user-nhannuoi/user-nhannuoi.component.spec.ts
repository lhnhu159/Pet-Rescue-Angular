import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNhannuoiComponent } from './user-nhannuoi.component';

describe('UserNhannuoiComponent', () => {
  let component: UserNhannuoiComponent;
  let fixture: ComponentFixture<UserNhannuoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNhannuoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNhannuoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
