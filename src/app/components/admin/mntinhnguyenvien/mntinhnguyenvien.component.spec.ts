import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MntinhnguyenvienComponent } from './mntinhnguyenvien.component';

describe('MntinhnguyenvienComponent', () => {
  let component: MntinhnguyenvienComponent;
  let fixture: ComponentFixture<MntinhnguyenvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntinhnguyenvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntinhnguyenvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
