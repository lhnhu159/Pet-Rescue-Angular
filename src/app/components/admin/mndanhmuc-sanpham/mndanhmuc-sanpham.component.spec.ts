import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MndanhmucSanphamComponent } from './mndanhmuc-sanpham.component';

describe('MndanhmucSanphamComponent', () => {
  let component: MndanhmucSanphamComponent;
  let fixture: ComponentFixture<MndanhmucSanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MndanhmucSanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MndanhmucSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
