import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  userDetails(user): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/login/user', user, { observe : 'response' });
  }
}
