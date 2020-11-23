import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MndanhmuctintucComponent } from './mndanhmuctintuc.component';

describe('MndanhmuctintucComponent', () => {
  let component: MndanhmuctintucComponent;
  let fixture: ComponentFixture<MndanhmuctintucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MndanhmuctintucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MndanhmuctintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
