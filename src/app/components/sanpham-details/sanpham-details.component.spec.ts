import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamDetailsComponent } from './sanpham-details.component';

describe('SanphamDetailsComponent', () => {
  let component: SanphamDetailsComponent;
  let fixture: ComponentFixture<SanphamDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanphamDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
