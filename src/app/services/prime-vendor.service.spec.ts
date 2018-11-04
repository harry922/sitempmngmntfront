import { TestBed, inject } from '@angular/core/testing';

import { PrimeVendorService } from './prime-vendor.service';

describe('PrimeVendorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrimeVendorService]
    });
  });

  it('should ...', inject([PrimeVendorService], (service: PrimeVendorService) => {
    expect(service).toBeTruthy();
  }));
});
