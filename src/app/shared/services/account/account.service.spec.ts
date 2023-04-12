import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { IUser } from 'src/app/shared/interfaces/user/user.interface';
import { environment } from 'src/environments/environment';

describe('AccountService', () => {
  let service: AccountService;
  let http: HttpTestingController;
  const url = environment.BACKEND_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AccountService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get ', () => {
    const credentials: IUser = {
      email: 'user@gmail.com',
      password: '123qwe',
    };
    service.login(credentials).subscribe();

    const req = http.expectOne(
      `${url}/auth?email=${credentials.email}&password=${credentials.password}`
    );
    expect(req.request.method).toEqual('GET');
  });

  afterEach(() => {
    http.verify();
  });
});
