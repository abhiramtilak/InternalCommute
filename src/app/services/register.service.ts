import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor( private httpClient: HttpClient ) { }

  registerUser(user): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/register/user', user, { observe : 'response' });
  }
}
