import { TestBed } from '@angular/core/testing';

import { NewapiService } from './newapi.service';

describe('NewapiService', () => {
  let service: NewapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
