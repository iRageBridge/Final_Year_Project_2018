import { TestBed, inject } from '@angular/core/testing';

import { ResultsPaginationService } from './results-pagination.service';

describe('ResultsPaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultsPaginationService]
    });
  });

  it('should be created', inject([ResultsPaginationService], (service: ResultsPaginationService) => {
    expect(service).toBeTruthy();
  }));
});
