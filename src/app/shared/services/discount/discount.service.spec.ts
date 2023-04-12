import { TestBed } from '@angular/core/testing';

import { DiscountService } from './discount.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('DiscountService', () => {
  let service: DiscountService;
  let http: HttpTestingController;
  let url = environment.BACKEND_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DiscountService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    const data = [
      {
        name: 'name',
        title: 'title',
        imagePath: 'image',
        text: 'text',
        id: 1,
      },
    ];
    service.getAll().subscribe((response) => expect(response).toBe(data));
    const req = http.expectOne(url + `/discounts`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('can test HttpClient.post', () => {
    const data = {
      name: 'name',
      title: 'title',
      text: 'text',
      imagePath: 'image',
    };
    service.create(data).subscribe((response) => expect(response).toBeNull());
    const req = http.expectOne(url + `/discounts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(data);
    req.flush(null);
  });

  it('can test HttpClient.delete ', () => {
    const id = 1;
    service.delete(id).subscribe((response) => expect(response).toBeNull());
    const req = http.expectOne(url + `/discounts/` + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('can test HttpClient.patch ', () => {
    const data = {
      name: 'name',
      title: 'title',
      text: 'text',
      imagePath: 'image',
    };
    const id = 1;
    service.update(data, id).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = http.expectOne(url + `/discounts/` + id);
    expect(req.request.method).toBe('PATCH');
    req.flush(data);
  });

  afterEach(() => {
    http.verify();
  });
});
