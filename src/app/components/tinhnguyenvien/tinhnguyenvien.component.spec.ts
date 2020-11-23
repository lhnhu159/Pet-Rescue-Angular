import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhnguyenvienComponent } from './tinhnguyenvien.component';

describe('TinhnguyenvienComponent', () => {
  let component: TinhnguyenvienComponent;
  let fixture: ComponentFixture<TinhnguyenvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhnguyenvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhnguyenvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
