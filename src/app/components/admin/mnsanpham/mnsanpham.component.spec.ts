import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnsanphamComponent } from './mnsanpham.component';

describe('MnsanphamComponent', () => {
  let component: MnsanphamComponent;
  let fixture: ComponentFixture<MnsanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnsanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
