import {TestBed} from '@angular/core/testing';

import {ActiveToDoService} from './active-to-do.service';

describe('ActiveToDoService', () => {
  let service: ActiveToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveToDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
