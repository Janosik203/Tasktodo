import { TestBed } from '@angular/core/testing';

import { FirebaseProviderService } from './firebase-provider.service';

describe('FirebaseProviderService', () => {
  let service: FirebaseProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
