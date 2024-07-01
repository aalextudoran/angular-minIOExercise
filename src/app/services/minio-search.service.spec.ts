import { TestBed } from '@angular/core/testing';

import { MinioSearchService } from './minio-search.service';

describe('MinioSearchService', () => {
  let service: MinioSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinioSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
