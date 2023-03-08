import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private url = environment.BACKEND_URL;
  private api = { auth: `${this.url}/auth` };
  public isLogin$ = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  
  login(credential: IUser): Observable<any>{
    return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
  }
}
