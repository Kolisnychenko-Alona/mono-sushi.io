import { TestBed } from '@angular/core/testing';

import { CallBackService } from './call-back.service';

describe('CallBackService', () => {
  let service: CallBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
