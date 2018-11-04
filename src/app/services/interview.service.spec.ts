import { TestBed, inject } from '@angular/core/testing';

import { InterviewService } from './interview.service';

describe('InterviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewService]
    });
  });

  it('should ...', inject([InterviewService], (service: InterviewService) => {
    expect(service).toBeTruthy();
  }));
});
