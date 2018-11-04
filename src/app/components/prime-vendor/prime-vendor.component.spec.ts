import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeVendorComponent } from './prime-vendor.component';

describe('PrimeVendorComponent', () => {
  let component: PrimeVendorComponent;
  let fixture: ComponentFixture<PrimeVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
