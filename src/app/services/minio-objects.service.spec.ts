import { TestBed } from '@angular/core/testing';

import { MinioObjectsService } from './minio-objects.service';

describe('MinioObjectsService', () => {
  let service: MinioObjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinioObjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
