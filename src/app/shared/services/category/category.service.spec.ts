import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let http: HttpTestingController;
  let url = environment.BACKEND_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(CategoryService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('can test HttpClient.get', () => {
    const data = [{
      name: 'name',
      path: 'path',
      imagePath: 'image',
      id:'1'
    }];
    service.getAll().subscribe((response) => expect(response).toBe(data));
    const req = http.expectOne(url + `/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('can test HttpClient.post', () => {
    const data = {
      name: 'name',
      path: 'path',
      imagePath: 'image'
    };
    service.create(data).then((response) => expect(response).toBeNull());
    const req = http.expectOne(url + `/categories`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(data);
    req.flush(null);
  });

  it('can test HttpClient.delete ', () => {
    const id = '1';
    service.delete(id).then((response) => expect(response).toBeNull());
    const req = http.expectOne(url + `/categories/` + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('can test HttpClient.patch ', () => {
    const data = {
      name: 'name',
      path: 'path',
      imagePath: 'image',
    };
    const id =' 1';
    service.update(data, id).then((response) => {
      expect(response).toBeTruthy();
    });
    const req = http.expectOne(url + `/categories/` + id);
    expect(req.request.method).toBe('PATCH');
    req.flush(data);
  });

  afterEach(() => {
    http.verify();
  });
});