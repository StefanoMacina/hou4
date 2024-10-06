import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SigninRequest, SignupRequest, Response } from '../shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private baseurl = environment.baseUrl;
  constructor(private _http : HttpClient) { }

  signUp(signupRequest: SignupRequest): Observable<Response> {
    return this._http.post<Response>(this.baseurl + '/signup', signupRequest);
  }

  signIn(signinRequest: SigninRequest): Observable<Response> {
    return this._http.post<Response>(this.baseurl + '/signin', signinRequest)
  }
}
