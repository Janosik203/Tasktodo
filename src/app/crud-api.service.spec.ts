import {TestBed} from '@angular/core/testing';

import {CrudApiService} from './crud-api.service';
import {HttpClientModule} from "@angular/common/http";

describe('CrudApiService', () => {
  let service: CrudApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(CrudApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
